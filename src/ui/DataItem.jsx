import styled from "styled-components";

const StyledDataItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;
  color: var(--color-grey-600);
  & input {
    /* max-width: 700px; */
    justify-self: flex-end;
  }
`;

const Label = styled.span`
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

function DataItem({ icon, label, color, children }) {
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
