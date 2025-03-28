import styled from "styled-components";

const StyledFullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function FullPage() {
  return <StyledFullPage></StyledFullPage>;
}

export default FullPage;
