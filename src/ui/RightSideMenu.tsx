import styled from "styled-components";
import MainNav from "./MainNav";
const StyledRightSideMenu = styled.aside`
  /* background-color: var(--color-grey-0); */
  background-color: var(--color-grey-50);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  right: 0;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  height: 100%;
  /* visibility: hidden; */
`;

function RightSideMenu() {
  return (
    <StyledRightSideMenu>
      {/* <Logo /> */}

      {/* <SideScreen /> */}
      <MainNav />
      {/* <Uploader /> */}
    </StyledRightSideMenu>
  );
}

export default RightSideMenu;
