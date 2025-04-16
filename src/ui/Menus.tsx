import {
  createContext,
  MouseEvent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

// ------ Styled Components ------
const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{ position: { x: number; y: number } | null }>`
  position: fixed;
  z-index: 9999;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  color: var(--color-grey-500);

  ${({ position }) =>
    position &&
    `
    right: ${position.x}px;
    top: ${position.y}px;
  `}
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

// ------ Types ------
interface MenusContextType {
  openId: string;
  position: { x: number; y: number } | null;
  open: (id: string) => void;
  close: () => void;
  setPosition: (pos: { x: number; y: number }) => void;
}

interface ToggleProps {
  id: string;
  icon?: ReactNode;
}

interface ListProps {
  id: string;
  children: ReactNode;
}

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onFuncFromOutside?: (e: MouseEvent<HTMLButtonElement>) => void;
}

interface MenusProps {
  children: ReactNode;
}

// ------ Context ------
const MenusContext = createContext<MenusContextType | null>(null);

function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const close = () => setOpenId("");
  const open = setOpenId;

  useEffect(() => {
    if (openId !== "") {
      setLastScrollPosition(window.scrollY);

      const handleScroll = () => {
        const currentScrollPosition = window.scrollY;
        const scrollDifference = Math.abs(
          currentScrollPosition - lastScrollPosition
        );
        if (scrollDifference > 20) close();
      };

      window.addEventListener("scroll", handleScroll, true);
      return () => window.removeEventListener("scroll", handleScroll, true);
    }
  }, [openId, lastScrollPosition]);

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id, icon }: ToggleProps) {
  const context = useContext(MenusContext);
  if (!context) return null;

  const { openId, open, close, setPosition } = context;

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement)
      .closest("button")
      ?.getBoundingClientRect();
    if (!rect) return;

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  };

  return (
    <StyledToggle onClick={handleClick}>
      {icon || <HiEllipsisVertical />}
    </StyledToggle>
  );
}

function List({ id, children }: ListProps) {
  const context = useContext(MenusContext);
  if (!context) return null;

  const { openId, position, close } = context;
  const ref = useOutsideClick(
    close,
    false
  ) as React.RefObject<HTMLUListElement>;

  // const ref = useOutsideClick(close, false);

  if (openId !== id || !position) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick, onFuncFromOutside }: ButtonProps) {
  const context = useContext(MenusContext);
  if (!context) return null;

  const { close } = context;

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      onFuncFromOutside?.(e);
      onClick?.(e);
      close();
    },
    [onClick, onFuncFromOutside, close]
  );

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

// Attach subcomponents
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
