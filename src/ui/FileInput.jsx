import React, { useRef, useState } from "react";
import styled from "styled-components";

const HiddenFileInput = styled.input.attrs({ type: "file" })`
  display: none;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const CustomButton = styled.button`
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.8rem 1.2rem;
  border-radius: var(--border-radius-sm);
  border: none;
  color: var(--color-brand-50);
  background-color: var(--color-brand-600);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const FileNameDisplay = styled.span`
  margin-left: 1rem;

  /* margin-top: 1rem; */
  font-size: 1.4rem;
`;

function FileInput({ onChange, disabled }) {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("");
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Container>
      <HiddenFileInput
        ref={fileInputRef}
        onChange={handleChange}
        disabled={disabled}
      />
      <CustomButton type="button" onClick={handleButtonClick}>
        Select File
      </CustomButton>
      {fileName && <FileNameDisplay>{fileName}</FileNameDisplay>}
    </Container>
  );
}

export default FileInput;
