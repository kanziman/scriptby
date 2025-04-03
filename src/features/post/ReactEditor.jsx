import { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import ReactQuill from "react-quill-new";
// import "react-quill-new/dist/quill.snow.css";

import styled from "styled-components";
import ReactModule from "./reactModule";

const CustomQuillEditorView = styled.div`
  #toolBar {
    box-sizing: border-box;
    /* 높이를 고정하지 않고 패딩으로 여백 확보 */
    padding: 0.5rem 0.5rem;
    width: 100%;
    border: 1px solid var(--color-grey-500);
    border-radius: 5px;
    margin-bottom: 0.4rem;
    display: flex;
    flex-direction: column; /* 두 줄로 세로 정렬 */
    gap: 0.4rem; /* 줄 사이 간격 */
    /* 내부 각 행은 가로로 배치 */
    .ql-toolbar-row {
      display: flex;
      flex-wrap: nowrap;
      /* gap: 2.5rem; */
    }
    .ql-toolbar-row {
      display: flex;
      flex-wrap: nowrap; /* 줄바꿈 방지 */
      white-space: nowrap; /* 텍스트 줄바꿈 방지 */
      gap: 0.5rem;
    }
  }

  #quillContent {
    border: 1px solid var(--color-grey-500);
    border-radius: 5px;
    background-color: var(--color-grey-50);

    .ql-container {
      box-sizing: border-box;
      height: 35rem;
      padding: 0.8rem;
      border: none;
      &:focus-within {
        outline: 2px solid var(--color-brand-600);
        outline-offset: 0px;
        border-radius: 5px;
      }
      .ql-editor {
        &::-webkit-scrollbar {
          width: 3px;
        }
        &::-webkit-scrollbar-thumb {
          background: gray;
          border-radius: 15px;
        }
        &::-webkit-scrollbar-track {
          background: rgba(200, 200, 200, 0.1);
        }
      }
    }
  }

  @media (max-width: 50rem) {
    #toolBar {
      .ql-toolbar-row {
        gap: 0.3rem;
        button,
        select {
          font-size: 1.2rem;
          padding: 0.2rem 0.5rem;
        }
      }

      .ql-toolbar.ql-snow .ql-formats {
        margin-right: 0 !important;
      }
      svg {
        width: 1.4rem;
      }
    }
  }
`;

const ReactEditor = ({ value, onChange, register }) => {
  console.log("value :>> ", value);
  const formats = [
    "header",
    "size",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "indent",
    "link",
    "image",
    "color",
    "background",
    "align",
    "script",
    "float",
    "height",
    "width",
    "code-block",
    "break",
  ];

  const modules = useMemo(
    () => ({
      imageActions: {},
      imageFormats: {},
      toolbar: {
        container: "#toolBar",
        ImageResize: {
          modules: ["Resize"],
        },
      },
    }),
    []
  );

  return (
    <CustomQuillEditorView>
      <div id="toolBar">
        <ReactModule />
      </div>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        id="quillContent"
        onChange={onChange}
        register={register}
        value={value}
      />
    </CustomQuillEditorView>
  );
};

export default ReactEditor;
