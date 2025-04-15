import { ReactNode } from "react";
import styled from "styled-components";

type ColorType =
  | "brand"
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "grey"
  | string; // 확장 가능

interface LabelProps {
  color?: ColorType;
}

const StyledDataItem = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 4fr;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;
  color: var(--color-grey-600);

  & input {
    justify-self: flex-end;
  }
`;

const Label = styled.span<LabelProps>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: ${(props) =>
      !props.color
        ? "var(--color-brand-600)"
        : `var(--color-${props.color}-700)`};
  }
`;

interface DataItemProps {
  icon: ReactNode;
  label: string;
  color?: ColorType;
  children: ReactNode;
}

function DataItem({
  icon,
  label,
  color,
  children,
}: DataItemProps): JSX.Element {
  return (
    <StyledDataItem>
      <Label color={color}>
        {icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  );
}

export default DataItem;
