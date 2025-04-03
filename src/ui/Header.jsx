import styled from "styled-components";
import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";
import HeaderNavMenu from "./HeaderNavMenu";

import { useEffect, useRef, useState } from "react";
import { useIsBrowser } from "../hooks/useIsBrowser";

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
  /* margin: 0 auto; */
  /* justify-content: space-between; */
  transition: all 0.3s ease-in-out;

  &.sticky {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 50em) {
    padding: 0.8rem 2.4rem;
  }
  @media (max-width: 34em) {
    padding: 1rem 1rem;
    font-weight: 500;
    font-size: 1.8rem;
  }
`;

function Header() {
  const isBrowserSmall = useIsBrowser();
  const headerRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const headerHeight = "8rem";

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleScroll = () => {
      // 스크롤 위치가 특정 값(예: 100px)을 넘어가면 sticky 적용
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // sticky 상태가 변경될 때 main 엘리먼트에 margin-top 추가
    const mainElement = document.querySelector("main");
    if (!mainElement) return;

    if (isSticky) {
      mainElement.style.marginTop = headerHeight;
    } else {
      mainElement.style.marginTop = "0";
    }

    // 상태 변경 시 margin 제거를 보장하기 위한 클리어 함수
    return () => {
      if (mainElement) {
        mainElement.style.marginTop = "0";
      }
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
