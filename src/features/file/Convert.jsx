import React, { useState } from "react";
import styled from "styled-components";
import * as XLSX from "xlsx";
import Button from "../../ui/Button";
import { useConvert } from "./useConvert";

// styled-components를 이용한 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const TextareaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
`;

const StyledTextarea = styled.textarea`
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
  const { rightText, doConvert, setRightText } = useConvert();

  // reset 버튼 클릭 시 오른쪽 텍스트 에리어 리셋
  const handleReset = () => {
    setRightText("");
  };

  const handleDownload = () => {
    // 헤더 컬럼 추가
    const headerRow = [
      "Original",
      "Translated",
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
      .map((line) => [line, "", "", "", "", "", "", ""]);
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
