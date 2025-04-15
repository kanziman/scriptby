import { ReactElement, ReactNode } from "react";
import styled, { css } from "styled-components";

interface StyledFormRowProps {
  orientation?: "vertical" | "horizontal";
  noFlex?: boolean;
  hasButton?: boolean;
}

const StyledFormRow = styled.div<StyledFormRowProps>`
  display: grid;
  align-items: center;

  grid-template-columns: ${(props) =>
    props.orientation === "vertical" ? "1fr" : "0.5fr 1fr"};
  gap: ${(props) => (props.orientation === "vertical" ? "0.8rem" : "2.4rem")};

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

interface FormRowProps {
  label?: string | ReactNode;
  error?: string;
  children: ReactElement;
  orientation?: "vertical" | "horizontal";
  noFlex?: boolean;
  hasButton?: boolean;
}

function FormRow({
  label,
  error,
  children,
  orientation = "horizontal",
  noFlex = false,
  hasButton = false,
}: FormRowProps): JSX.Element {
  return (
    <StyledFormRow
      orientation={orientation}
      noFlex={noFlex}
      hasButton={hasButton}
    >
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
