import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { ResizableImage } from "./ResizeableImage";
import TiptapEditorMenu from "./TiptapEditorMenu"; // 경로는 실제 파일 위치에 맞게 수정
import "./tiptap.scss"; // 기존 SCSS 파일 임포트 (전역 또는 모듈 방식으로 사용)
const TiptapEditor = ({ modelValue = "", onChange }) => {
  const limit = 3000;
  const editor = useEditor({
    content: modelValue,

    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "글을 작성하세요.",
      }),
      Link,
      // Image,
      ResizableImage,
      CharacterCount.configure({
        limit: limit,
      }),
    ],
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  // modelValue가 바뀔 때 에디터 내용과 동기화
  useEffect(() => {
    if (editor && editor.getHTML() !== modelValue) {
      editor.commands.setContent(modelValue, false);
    }
  }, [modelValue, editor]);

  return (
    <div className="q-card tiptap" style={{ border: "1px solid #ccc" }}>
      <TiptapEditorMenu editor={editor} />

      <div
        className="q-separator"
        style={{ margin: "0.2rem 0", borderTop: "1px solid #ccc" }}
      />

      <EditorContent editor={editor} className="editor__content" />

      {editor && (
        <div className="character-count text-orange">
          <span>
            {editor.storage.characterCount.characters()} / {limit} characters
          </span>
        </div>
      )}
    </div>
  );
};

export default TiptapEditor;
