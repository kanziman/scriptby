import React, { ForwardedRef, SelectHTMLAttributes } from "react";
import styled from "styled-components";

// 🔹 prop에 따라 스타일 분기할 수 있도록 타입 정의
interface StyledSelectProps {
  type?: "white" | "default";
}

// 🔹 options 타입 정의
interface Option {
  value: string;
  label: string;
}

// 🔹 Select 컴포넌트 Props 정의
interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    StyledSelectProps {
  options: Option[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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
`;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { options, value, onChange, ...props },
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <StyledSelect ref={ref} value={value} onChange={onChange} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    );
  }
);

Select.displayName = "Select";

export default Select;
