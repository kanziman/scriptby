import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
import { useEffect, useMemo, useRef } from "react";
import { Quill } from "react-quill";

Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);

const StyledReactQuill = styled(ReactQuill)`
  .ql-editor {
    caret-color: black;
  }
  margin-bottom: 4.8rem;
`;

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "color",
  "background",
  "float",
  "height",
  "width",
];

function ReactQuillEditor({ style, value, onChange }) {
  console.log("value :>> ", value);
  const QuillRef = useRef();

  // 에디터 초기화 시 원본 HTML 그대로 유지
  useEffect(() => {
    if (QuillRef.current) {
      const quill = QuillRef.current.getEditor();
      quill.clipboard.dangerouslyPasteHTML(value || "");
    }
  }, [value]);

  const modules = useMemo(
    () => ({
      imageActions: {},
      imageFormats: {},
      // 툴바 설정
      toolbar: {
        container: [
          [{ header: [1, 2, false] }], // header 설정
          ["bold", "italic", "underline", "strike", "blockquote"], // 굵기, 기울기, 밑줄 등 부가 tool 설정
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ], // 리스트, 인덴트 설정
          ["link", "image"], // 링크, 이미지, 비디오 업로드 설정
          [{ align: [] }, { color: [] }, { background: [] }], // 정렬, 글자 색, 글자 배경색 설정
          ["clean"], // toolbar 설정 초기화 설정
        ],

        // 이미지 크기 조절
        ImageResize: {
          modules: ["Resize"],
        },
      },
    }),
    []
  );

  const handleChange = (content) => {
    // 수정된 내용을 그대로 반환
    onChange(content);

    // 디버그용 로그 (필요한 경우 주석 해제)
    console.log("onChange value :>> ", content);
  };

  return (
    <StyledReactQuill
      ref={QuillRef}
      placeholder="본문을 입력해주세요"
      theme="snow"
      style={style}
      formats={formats}
      modules={modules}
      value={value}
      onChange={handleChange}
    />
  );
}

export default ReactQuillEditor;
