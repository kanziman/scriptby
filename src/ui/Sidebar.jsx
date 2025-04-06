import { HiOutlineArrowLeft } from "react-icons/hi2";
import styled from "styled-components";
import { useSidebar } from "../context/SidebarContext";
import SideScreen from "../features/scripts/SideScreen";

const StyledSidebar = styled.aside`
  position: relative; /* 자식의 absolute 위치를 위한 기준 */
  background-color: var(--color-grey-50);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  height: 100%;
`;

const CloseIcon = styled(HiOutlineArrowLeft)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.8rem;
  height: 2.8rem;
  cursor: pointer;
`;

function Sidebar() {
  const { toggleSidebar } = useSidebar();

  return (
    <StyledSidebar>
      <CloseIcon onClick={toggleSidebar} />
      <SideScreen />
      {/* <MainNav /> */}
      {/* <Uploader /> */}
    </StyledSidebar>
  );
}

export default Sidebar;
