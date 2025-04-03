import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Select from "./Select";

const StyledSort = styled.div`
  select {
    font-size: 1.4rem;
    font-weight: 600;
    padding: 0.8rem;
    -webkit-appearance: none;
    appearance: none;
  }
`;

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
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
