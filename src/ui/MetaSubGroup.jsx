import styled from "styled-components";

// Main container for all meta information
const StyledMetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 1.2rem 2rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  background-color: var(--color-grey-100);
  @media (max-width: 50em) {
    padding: 0.8rem 1rem;
  }
`;

// Group of related meta information (e.g., all season info or production info)
const StyledMetaGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;

  &:not(:last-child) {
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-grey-200);
  }
`;

// Individual meta item with label and value
const StyledMetaSubGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
  font-size: 1rem;
  color: var(--color-grey-500);
  @media (max-width: 50em) {
    font-size: 0.9rem;
  }
  @media (max-width: 34em) {
    font-size: 0.8rem;
  }
`;

const StyledGroupTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 4.8rem;
  @media (max-width: 50em) {
    font-size: 1.4rem;
    min-height: 4.4rem;
  }
  @media (max-width: 34em) {
    font-size: 1.2rem;
    min-height: 3.6rem;
  }
`;

const Value = styled.span`
  font-weight: 500;
  color: var(--color-grey-700);
`;

const Label = styled.span`
  font-weight: 600;
  color: var(--color-grey-500);
  text-transform: capitalize;
`;

const Delimiter = styled.span`
  color: var(--color-grey-400);
  margin: 0 0.25rem;
`;

// Main container component
function MetaContainer({ children, title }) {
  return (
    <StyledMetaContainer>
      {title && <StyledGroupTitle>{title}</StyledGroupTitle>}
      {children}
    </StyledMetaContainer>
  );
}

// Group for related meta information
function MetaGroup({ children, title }) {
  return (
    <>
      {title && <StyledGroupTitle>{title}</StyledGroupTitle>}
      <StyledMetaGroup>{children}</StyledMetaGroup>
    </>
  );
}

// Individual meta item
function MetaSubGroup({ label, value, delimiter, label1, value1 }) {
  return (
    <StyledMetaSubGroup>
      <Label>{label}</Label>
      <Value>{value}</Value>
      {delimiter && (
        <>
          <Delimiter>{delimiter}</Delimiter>
          <Label>{label1}</Label>
          <Value>{value1}</Value>
        </>
      )}
    </StyledMetaSubGroup>
  );
}

export { MetaContainer, MetaGroup, MetaSubGroup };
