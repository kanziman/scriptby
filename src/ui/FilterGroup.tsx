import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { ButtonHTMLAttributes } from "react";

const StyledFilter = styled.div`
  background-color: var(--color-grey-100);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
  height: 100%;
`;

interface FilterButtonProps {
  active?: boolean;
  size?: string;
}

const FilterButton =
  styled.button <
  FilterButtonProps >
  `
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
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

interface FilterOption {
  value: string;
  label: string;
}

interface FilterProps {
  filterField: string;
  options: FilterOption[];
  onChange?: (value: string) => void;
  value?: string;
  size?: string;
}

function Filter({
  filterField,
  options,
  onChange,
  value,
  size,
}: FilterProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter =
    value ?? searchParams.get(filterField) ?? options.at(0)?.value ?? "";

  function handleClick(value: string) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
    onChange?.(value);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
          size={size}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
