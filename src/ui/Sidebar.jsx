import styled from "styled-components";
import SideScreen from "../features/scripts/SideScreen";
const StyledSidebar = styled.aside`
  /* background-color: var(--color-grey-0); */
  background-color: var(--color-grey-50);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  height: 100%;
  /* visibility: hidden; */
`;

function Sidebar() {
  return (
    <StyledSidebar>
      {/* <Logo /> */}

      <SideScreen />
      {/* <MainNav /> */}
      {/* <Uploader /> */}
    </StyledSidebar>
  );
}

export default Sidebar;
