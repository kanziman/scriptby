import styled from "styled-components";

// MetaGroup: 단일 행의 meta 정보를 flex로 정렬
const StyledMetaGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  /* font-size: 1.2rem; */
`;
const StyledMetaSubGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: var(--color-grey-400);

  @media (max-width: 90rem) {
    font-size: 1rem;
  }
  @media (max-width: 42em) {
    font-size: 0.8rem;
  }
`;
const Bold = styled.span`
  font-weight: 500;
`;
const Label = styled.span`
  text-transform: capitalize;
`;
function MetaGroup() {
  return <StyledMetaGroup></StyledMetaGroup>;
}

function MetaSubGroup({ label, boldValue, delimeter }) {
  return (
    <StyledMetaSubGroup>
      <Label>{label}</Label>
      <Bold>{boldValue}</Bold>
      {delimeter && delimeter}
    </StyledMetaSubGroup>
  );
}

export { MetaGroup, MetaSubGroup };
