import { ChangeEvent, SelectHTMLAttributes } from "react";
import styled from "styled-components";

// 언어 옵션 타입
interface LanguageOption {
  Code: string;
  Flag: string;
  EnglishName: string;
}

interface StyledSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  type?: "white" | string;
}

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  margin: 0.6rem auto;

  @media (max-width: 800px) {
    width: 50%;
  }
`;

interface FlagSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: LanguageOption[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  excludeValue?: string;
}

function FlagSelect({
  options,
  value,
  onChange,
  excludeValue,
  ...props
}: FlagSelectProps): JSX.Element {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      <option value="" disabled hidden>
        SELECT
      </option>
      {options.map((lang) => (
        <option
          key={lang.Code}
          value={lang.Code}
          disabled={lang.Code === excludeValue}
        >
          {lang.Flag} {lang.EnglishName}
        </option>
      ))}
    </StyledSelect>
  );
}

export default FlagSelect;
