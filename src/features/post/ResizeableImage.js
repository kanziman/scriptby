import { Node, mergeAttributes } from "@tiptap/core";
import interact from "interactjs";

export const ResizableImage = Node.create({
  name: "resizableImage",

  group: "block",

  inline: false,

  draggable: true,

  addAttributes() {
    return {
      src: {},
      alt: { default: null },
      title: { default: null },
      width: { default: "auto" },
      height: { default: "auto" },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return ["img", mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ chain }) => {
          return chain()
            .insertContent({
              type: this.name,
              attrs: options,
            })
            .run();
        },
    };
  },

  addNodeView() {
    return (props) => {
      const { node, getPos, view, updateAttributes } = props;

      const safeUpdateAttributes =
        typeof updateAttributes === "function"
          ? updateAttributes
          : (attrs) => {
              const pos = getPos();
              const transaction = view.state.tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                ...attrs,
              });
              view.dispatch(transaction);
              return true;
            };

      const container = document.createElement("div");
      container.style.display = "inline-block";
      container.style.position = "relative";
      container.style.maxWidth = "100%";

      const img = document.createElement("img");
      img.setAttribute("src", node.attrs.src);
      img.style.width = node.attrs.width || "auto";
      img.style.height = node.attrs.height || "auto";
      img.style.maxWidth = "100%";
      img.style.display = "block";
      img.style.objectFit = "contain";
      container.appendChild(img);

      // 리사이즈 핸들 추가
      const handle = document.createElement("div");
      handle.style.position = "absolute";
      handle.style.right = "0";
      handle.style.bottom = "0";
      handle.style.width = "15px";
      handle.style.height = "15px";
      handle.style.background = "rgba(0,0,0,0.5)";
      handle.style.cursor = "se-resize";
      handle.style.zIndex = "10";
      container.appendChild(handle);

      // interact.js를 이용한 고급 리사이즈 구현
      interact(container).resizable({
        edges: { bottom: true, right: true },
        listeners: {
          move(event) {
            const { target } = event;
            const img = target.querySelector("img");

            let newWidth = event.rect.width;
            let newHeight = event.rect.height;

            // 비율 유지를 위한 계산
            const originalAspectRatio = img.naturalWidth / img.naturalHeight;

            // 너비 기준으로 높이 조정
            newHeight = newWidth / originalAspectRatio;

            target.style.width = `${newWidth}px`;
            target.style.height = `${newHeight}px`;

            img.style.width = "100%";
            img.style.height = "100%";

            safeUpdateAttributes({
              width: `${newWidth}px`,
              height: `${newHeight}px`,
            });
          },
        },
        modifiers: [
          // 최소 크기 제한
          interact.modifiers.restrictSize({
            min: { width: 50, height: 50 },
          }),
        ],
        inertia: true,
      });

      return {
        dom: container,
        update(updatedNode) {
          if (updatedNode.type.name !== node.type.name) {
            return false;
          }
          img.setAttribute("src", updatedNode.attrs.src);
          img.style.width = updatedNode.attrs.width || "auto";
          img.style.height = updatedNode.attrs.height || "auto";
          return true;
        },
      };
    };
  },
});
