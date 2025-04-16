import styled from "styled-components";
import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";
import HeaderNavMenu from "./HeaderNavMenu";

import { useEffect, useRef, useState } from "react";
import { useBrowser } from "../hooks/useBrowser";

// Styled header
const StyledHeader = styled.header`
  position: relative;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  height: 8rem;
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  padding: 0.8rem 4.8rem;
  max-width: 100%;
  transition: all 0.3s ease-in-out;

  &.sticky {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (${(props) => props.theme.media.tablet}) {
    padding: 0.8rem 2.4rem;
  }

  @media (${(props) => props.theme.media.mobile}) {
    padding: 1rem 1rem;
    font-weight: 500;
    font-size: 1.8rem;
  }
`;

function Header() {
  const isBrowserSmall = useBrowser();
  const headerRef = useRef<HTMLElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const headerHeight = "8rem";

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // sticky 상태일 때 main에 margin 적용
  useEffect(() => {
    const mainElement = document.querySelector("main") as HTMLElement | null;
    if (!mainElement) return;

    mainElement.style.marginTop = isSticky ? headerHeight : "0";

    return () => {
      mainElement.style.marginTop = "0";
    };
  }, [isSticky, headerHeight]);

  return (
    <StyledHeader ref={headerRef} className={isSticky ? "sticky" : ""}>
      <HeaderNavMenu />
      <UserAvatar isBrowserSmall={isBrowserSmall} />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
