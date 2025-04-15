import styled, { css } from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  gap: 1rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: ${(props) =>
      props.orientation === "vertical"
        ? "none"
        : "1px solid var(--color-grey-100)"};
  }

  /* hasButton prop이 true일 경우(orientation이 vertical이 아니고 noFlex가 false일 때) flex 레이아웃 적용 */
  ${(props) =>
    props.orientation !== "vertical" &&
    !props.noFlex &&
    props.hasButton &&
    css`
      display: flex;
      justify-content: flex-end;
      gap: 1.2rem;
    `}

  @media (${(props) => props.theme.media.mobile}) {
    font-size: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
  word-break: keep-all;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children, orientation, noFlex, hasButton }) {
  return (
    <StyledFormRow
      orientation={orientation}
      noFlex={noFlex}
      hasButton={hasButton}
    >
      {label && <Label htmlFor={children?.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
