import styled, { css } from "styled-components";

interface ButtonTextProps {
  active?: boolean;
}

const ButtonText =
  styled.button <
  ButtonTextProps >
  `
  color: var(--color-grey-500);
  font-weight: 500;
  text-align: center;
  transition: all 0.3s;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  word-break: keep-all;

  ${(props) =>
    props.active &&
    css`
      background-color: inherit;
      color: var(--color-brand-500);
    `}

  &:hover,
  &:active {
    color: var(--color-grey-700);
  }
`;

export default ButtonText;
