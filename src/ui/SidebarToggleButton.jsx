import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styled from "styled-components";

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
  color: var(--color-tertiary-500);

  /* hover 시 너비 확장 */
  &:hover {
    width: 12rem;
    background-color: var(--color-grey-100);
    background-color: var(--color-tertiary-100);
    transition: all 0.3s;
  }

  /* 화살표 아이콘 */
  & svg {
    /* position: absolute; */
    /* left: 50%; */
    transform: translateX(10%);
    font-size: 2.8rem;
    color: var(--color-tertiary-500);
    margin-right: 0.6rem;
    flex-shrink: 0;
  }

  /* 버튼 텍스트 - 기본적으로 숨겨져 있음 */
  & span {
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s;
  }

  /* hover 시 텍스트 표시 */
  &:hover span {
    opacity: 1;
  }
`;

function SidebarToggleButton({ sidebarToggled, onToggle }) {
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
