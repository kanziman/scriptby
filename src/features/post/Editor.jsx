import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import content from "./content";
import Menubar from "./Menubar";

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
    ],
    content: content,
  });

  return (
    <div>
      <Menubar editor={editor}></Menubar>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
