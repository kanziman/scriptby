import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Select from "./Select";

// 🔹 스타일 컴포넌트
const StyledSort = styled.div`
  select {
    font-size: 1.4rem;
    font-weight: 600;
    padding: 0.8rem;
    -webkit-appearance: none;
    appearance: none;
  }
`;

// 🔹 옵션 타입 정의
interface Option {
  value: string;
  label: string;
}

// 🔹 컴포넌트 Props 타입
interface SortByProps {
  options: Option[];
}

function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <StyledSort>
      <Select
        options={options}
        type="white"
        value={sortBy}
        onChange={handleChange}
      />
    </StyledSort>
  );
}

export default SortBy;
