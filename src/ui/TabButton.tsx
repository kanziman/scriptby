import styled, { css } from "styled-components";

type TabButtonProps = {
  active?: boolean;
};

const TabButton = styled.button<TabButtonProps>`
  color: var(--color-brand-800);
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 600;
  font-size: 1.4rem;
  padding: 1.2rem 2.4rem;
  transition: all 0.3s;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-secondary-50);
  }

  @media (${(props) => props.theme.media.mobile}) {
    font-size: 1.2rem !important;
  }
`;

export default TabButton;
