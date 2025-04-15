import { ChangeEvent, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
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
  font-size: 1.4rem;
`;

interface FileInputProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

function FileInput({
  onChange,
  disabled = false,
}: FileInputProps): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFileName(files && files.length > 0 ? files[0].name : "");
    onChange?.(e);
  };

  return (
    <Container>
      <HiddenFileInput
        ref={fileInputRef}
        onChange={handleChange}
        disabled={disabled}
      />
      <CustomButton type="button" onClick={handleButtonClick}>
        <FormattedMessage id="form.file" defaultMessage="Select File" />
      </CustomButton>
      {fileName && <FileNameDisplay>{fileName}</FileNameDisplay>}
    </Container>
  );
}

export default FileInput;
