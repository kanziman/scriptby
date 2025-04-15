import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import FilterButton from "./FilterButton";

const StyledFilter = styled.div`
  background-color: inherit;
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

interface FilterOption {
  value: string;
  label: string;
}

interface FilterProps {
  filterField: string;
  options: FilterOption[];
}

function Filter({ filterField, options }: FilterProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter =
    searchParams.get(filterField) || options.at(0)?.value || "";

  function handleClick(value: string) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          size="small"
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
