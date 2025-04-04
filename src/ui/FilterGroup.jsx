import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  /* border: 1px solid var(--color-grey-100); */
  background-color: var(--color-grey-100);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
  height: 100%;
`;

const FilterButton = styled.button`
  height: 100%;
  background-color: var(--color-grey-100);
  color: var(--color-grey-700);
  border: none;
  word-break: keep-all;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-grey-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 600;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  /* ${(props) =>
    props.size === "small" &&
    css`
      @media (max-width: 34em) {
        font-size: 1rem !important;
      }
    `} */
`;

function Filter({ filterField, options, onChange, value, size }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = value
    ? value
    : searchParams.get(filterField) || options.at(0).value;

  // console.log("searchParams :>> ", searchParams.get(filterField));
  // console.log("currentFilter :>> ", currentFilter);

  function handleClick(value) {
    searchParams.set(filterField, value);
    // if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
    onChange?.(value);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          size={size}
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
