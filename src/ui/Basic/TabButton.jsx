import styled, { css } from "styled-components";

const TabButton = styled.button`
  background-color: var(--color-secondary-50);
  color: var(--color-secondary-800);
  /* background-color: var(--color-grey-0); */
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-secondary-600);
      color: var(--color-secondary-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 600;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 1.2rem 2.4rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-secondary-600);
    color: var(--color-secondary-50);
  }

  @media (max-width: 50em) {
    font-size: 1.2rem;
    padding: 0.6rem 1.2rem;
  }
`;

export default TabButton;
