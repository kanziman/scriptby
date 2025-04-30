import { useState } from "react";
import styled from "styled-components";
import * as XLSX from "xlsx";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { downloadSample } from "../../utils/helpers";
import { useConvert } from "./useConvert";
import { usePdfHandler } from "./usePdfHandler";

// styled-components를 이용한 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;
// 파일 입력 버튼을 오른쪽 상단에 고정
// const FileInputWrapper = styled.div`
//   display: flex;
//   align-self: flex-end;
//   margin-bottom: 1rem;
// `;

const FileInputWrapper = styled.div`
  position: absolute;
  top: -3rem;
  right: 0;

  cursor: help;

  &:hover::after {
    content: attr(title);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-8px);
    padding: 4px 8px;
    background: #333;
    color: #fff;
    font-size: 0.75rem;
    border-radius: 4px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 1;
    transition: opacity 0.2s;
  }
`;

const TextareaContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
  color: black;
`;

const StyledTextarea = styled.textarea`
  margin-top: 2rem;
  width: 48%;
  height: 50rem;
  padding: 1rem;
  font-size: 1.4rem;
  resize: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

function Convert() {
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const { doConvert } = useConvert({ rightText, setRightText });
  const { handleFileChange } = usePdfHandler(rightText, setRightText);

  // reset 버튼 클릭 시 오른쪽 텍스트 에리어 리셋
  const handleReset = () => {
    setRightText("");
  };

  const handleDownload = () => {
    // 헤더 컬럼 추가
    const headerRow = [
      "Original",
      "Translated",
      "Roman",
      "Original_Words",
      "Translated_Words",
      "Original_Phrases",
      "Translated_Phrases",
      "Original_Idioms",
      "Translated_Idioms",
    ];
    // 각 줄을 첫번째 컬럼에 넣고, 나머지는 빈 값으로 채움
    const dataRows = rightText
      .split("\n")
      .map((line) => [line, "", "", "", "", "", "", "", ""]);
    // 전체 데이터: 헤더 + 데이터 rows
    const wsData = [headerRow, ...dataRows];

    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // "download.xlsx" 파일명으로 다운로드 실행
    XLSX.writeFile(workbook, "download.xlsx");
  };

  return (
    <Container>
      <TextareaContainer>
        <FileInputWrapper title="It should be form of a script">
          <FileInput
            id="pdf-file"
            onChange={handleFileChange}
            name="PDF FILE"
            accept=".pdf,application/pdf"
          />
        </FileInputWrapper>
        <StyledTextarea
          value={leftText}
          onChange={(e) => setLeftText(e.target.value)}
          placeholder="왼쪽 텍스트 입력..."
        />
        <StyledTextarea
          value={rightText}
          onChange={(e) => setRightText(e.target.value)}
          placeholder="오른쪽 텍스트 입력..."
        />
      </TextareaContainer>
      <ButtonContainer>
        <Button variation="tertiary" onClick={downloadSample}>
          Sample
        </Button>
        <Button variation="inactive" onClick={handleReset}>
          Reset
        </Button>
        <Button variation="blue" onClick={() => doConvert(leftText)}>
          Convert
        </Button>

        <Button onClick={handleDownload}>Download</Button>
      </ButtonContainer>
    </Container>
  );
}

export default Convert;
