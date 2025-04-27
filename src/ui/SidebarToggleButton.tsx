import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styled from "styled-components";

// 🔹 styled button 정의
const ExpandButton = styled.button`
  display: flex;
  align-items: center;
  background-color: rgba(200, 200, 200, 0.7);
  border: none;
  padding: 0.4rem 0.8rem;
  position: fixed;
  top: 15%;
  left: -1%;
  z-index: 1;
  overflow: hidden;
  width: 4rem;
  height: 4rem;
  color: var(--color-tertiary-500);
  opacity: 0.5;

  &:hover {
    width: 12rem;
    background-color: var(--color-tertiary-100);
    opacity: 1;
    transition: all 0.3s;
  }

  & svg {
    transform: translateX(10%);
    font-size: 2.8rem;
    color: var(--color-tertiary-500);
    margin-right: 0.6rem;
    flex-shrink: 0;
  }

  & span {
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover span {
    opacity: 1;
  }
`;

// 🔹 Props 타입 지정
interface SidebarToggleButtonProps {
  sidebarToggled: boolean;
  onToggle: () => void;
}

function SidebarToggleButton({
  sidebarToggled,
  onToggle,
}: SidebarToggleButtonProps) {
  return (
    <ExpandButton onClick={onToggle}>
      {sidebarToggled ? (
        <FaAngleLeft />
      ) : (
        <>
          <FaAngleRight />
          <span>OPEN</span>
        </>
      )}
    </ExpandButton>
  );
}

export default SidebarToggleButton;
