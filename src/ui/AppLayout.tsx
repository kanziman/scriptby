import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import { useSidebar } from "../context/SidebarContext";
import VisitCounter from "../features/dashboard/VisitCounter";
import Header from "./Header";
import MainFooter from "./Layout/MainFooter";
import Sidebar from "./Sidebar";

interface OverlayProps {
  visible: boolean;
}

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 2rem 4.8rem 6.4rem;
  width: 100%;
  @media (${(props) => props.theme.media.mobile}) {
    padding: 2rem 0rem 3.2rem;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  max-width: 120rem;

  @media (${(props) => props.theme.media.landScapeTablet}) {
    max-width: 84rem;
  }
  @media (${(props) => props.theme.media.bigTablet}) {
    max-width: 75rem;
  }
  @media (${(props) => props.theme.media.tablet}) {
    max-width: 55rem;
  }
  @media (${(props) => props.theme.media.mobile}) {
    padding: 0 1rem;
    max-width: 39.5rem;
  }
`;

const Overlay = styled.div<OverlayProps>`
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
  overscroll-behavior: none;
`;

const SidebarModal = styled.div`
  background: white;
  width: 50%;
  height: 100%;
  box-shadow: 2px 0 5px var(--backdrop-100);
  overflow-y: auto;

  @media (${(props) => props.theme.media.tablet}) {
    width: 70%;
  }

  @media (${(props) => props.theme.media.mobile}) {
    width: 100%;
  }
`;

function AppLayout(): JSX.Element {
  const { scriptId } = useParams<{ scriptId?: string }>();
  const { sidebarToggled, toggleSidebar } = useSidebar();

  useEffect(() => {
    document.body.style.overflow = sidebarToggled ? "hidden" : "auto";

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

      <VisitCounter />
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
