import styled, { css } from "styled-components";

type Size = "small" | "medium" | "large";
export type Variation =
  | "primary"
  | "secondary"
  | "danger"
  | "inactive"
  | "tertiary"
  | "blue";

interface ButtonProps {
  size?: Size;
  variation?: Variation;
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
      background-color: var(--color-grey-100);
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

  tertiary: css`
    color: var(--color-tertiary-700);
    background-color: var(--color-tertiary-100);

    &:hover {
      background-color: var(--color-tertiary-700);
      color: var(--color-tertiary-100);
    }
  `,
  blue: css`
    color: var(--color-blue-700);
    background-color: var(--color-blue-100);

    &:hover {
      background-color: var(--color-blue-700);
      color: var(--color-blue-100);
    }
  `,
};

const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  word-break: keep-all;
  transition: background-color 0.2s, color 0.2s;

  ${(props) => sizes[props.size || "medium"]}
  ${(props) => variations[props.variation || "primary"]}

    @media (${(props) => props.theme.media.mobile}) {
    font-size: 1.2rem;
  }
`;

export default Button;
