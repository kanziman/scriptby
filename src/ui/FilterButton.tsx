import styled, { css } from "styled-components";
type Size = "small" | "medium" | "large";
type Variation = "primary" | "secondary" | "danger" | "inactive";

interface FilterButtonProps {
  size?: Size;
  variation?: Variation;
  active?: boolean;
}

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-700);
    background-color: var(--color-brand-100);

    &:hover {
      color: var(--color-brand-100);
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-300);
      color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-700);
    background-color: var(--color-red-100);

    &:hover {
      background-color: var(--color-red-700);
      color: var(--color-red-100);
    }
  `,
  inactive: css`
    color: var(--color-grey-500);
    background-color: var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-200);
      color: var(--color-grey-500);
    }
  `,
};

const FilterButton = styled.button<FilterButtonProps>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  word-break: keep-all;

  ${(props) => sizes[props.size || "medium"]}
  ${(props) => variations[props.variation || "primary"]}
  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-700);
      color: var(--color-brand-100);
    `}
`;

export default FilterButton;
