import React, { useRef } from "react";
import { BsTypeH1, BsTypeH2, BsTypeH3 } from "react-icons/bs";
import {
  FaBold,
  FaCode,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaMinus,
  FaPhotoVideo,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUndo,
} from "react-icons/fa";
import { uploadImage } from "../../services/apiPost";

const TiptapEditorMenu = ({ editor }) => {
  const fileRef = useRef(null);

  const handleLinkMenu = () => {
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return; // 취소한 경우
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const handleChangeFile = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const downloadURL = await uploadImage(e.target.files[0]);
      editor.chain().focus().setImage({ src: downloadURL }).run();
      e.target.value = ""; // input 초기화
    }
  };

  if (!editor) return null;

  return (
    <div className="grid">
      <div className="flex">
        {/* 숨겨진 파일 input */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleChangeFile}
        />

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          style={{
            color: editor.isActive("heading", { level: 1 })
              ? "blue"
              : undefined,
          }}
        >
          <BsTypeH1 />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          style={{
            color: editor.isActive("heading", { level: 2 })
              ? "blue"
              : undefined,
          }}
        >
          <BsTypeH2 />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          style={{
            color: editor.isActive("heading", { level: 3 })
              ? "blue"
              : undefined,
          }}
        >
          <BsTypeH3 />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          style={{ color: editor.isActive("bold") ? "blue" : undefined }}
        >
          <FaBold />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          style={{ color: editor.isActive("italic") ? "blue" : undefined }}
        >
          <FaItalic />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          style={{ color: editor.isActive("strike") ? "blue" : undefined }}
        >
          <FaStrikethrough />
        </button>

        <button
          type="button"
          onClick={handleLinkMenu}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          style={{ color: editor.isActive("link") ? "blue" : undefined }}
        >
          <FaLink />
        </button>
      </div>

      {/* 수직 구분선 */}
      <div
        className="divide"
        style={{
          width: "1px",
          backgroundColor: "#ccc",
          margin: "1rem 0 0.8rem 0",
        }}
      />

      <div className="flex">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          style={{ color: editor.isActive("code") ? "blue" : undefined }}
        >
          <FaCode />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          style={{ color: editor.isActive("blockquote") ? "blue" : undefined }}
        >
          <FaQuoteLeft />
        </button>
        <button
          type="button"
          onClick={() => fileRef.current && fileRef.current.click()}
        >
          <FaPhotoVideo />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          style={{
            color: editor.isActive("bulletList") ? "blue" : undefined,
          }}
        >
          <FaListUl />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          style={{
            color: editor.isActive("orderedList") ? "blue" : undefined,
          }}
        >
          <FaListOl />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <FaMinus />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <FaUndo />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

export default TiptapEditorMenu;
