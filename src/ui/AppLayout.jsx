import { useEffect } from "react";
import { HiX } from "react-icons/hi";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import { useSidebar } from "../context/SidebarContext";
import Header from "./Header";
import MainFooter from "./Layout/MainFooter";
import Sidebar from "./Sidebar";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 2rem 4.8rem 6.4rem;
  width: 100%;
  @media (max-width: 34em) {
    padding: 2rem 0rem 3.2rem;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  @media (max-width: 34em) {
    padding: 0 1rem;
  }
  max-width: ${({ theme }) => theme.breakpoints.desktop};

  @media (max-width: 84em) {
    max-width: ${({ theme }) => theme.breakpoints.smallDesktop};
  }
  @media (max-width: 60em) {
    max-width: ${({ theme }) => theme.breakpoints.tablet};
  }
  @media (max-width: 50em) {
    max-width: ${({ theme }) => theme.breakpoints.smallTablet};
  }
  @media (max-width: 34em) {
    max-width: ${({ theme }) => theme.breakpoints.mobile};
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--backdrop-100);
  z-index: 1000;
  transition: opacity 0.3s;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
  overscroll-behavior: none; /* 스크롤 전파 차단 */
`;

const SidebarModal = styled.div`
  background: white;
  width: 50%;
  height: 100%;
  box-shadow: 2px 0 5px var(--backdrop-100);
  overflow-y: auto;
  @media (max-width: 80rem) {
    width: 70%;
  }
  @media (max-width: 34rem) {
    width: 100%;
  }
`;

function AppLayout() {
  const { scriptId } = useParams();
  const { sidebarToggled, toggleSidebar } = useSidebar();

  useEffect(() => {
    if (sidebarToggled) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // 컴포넌트 언마운트 시 복원
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarToggled]);

  return (
    <StyledAppLayout>
      <Header />

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>

      <MainFooter />

      {scriptId && (
        <Overlay visible={sidebarToggled} onClick={toggleSidebar}>
          <SidebarModal onClick={(e) => e.stopPropagation()}>
            <Sidebar />
          </SidebarModal>
        </Overlay>
      )}
    </StyledAppLayout>
  );
}

export default AppLayout;
