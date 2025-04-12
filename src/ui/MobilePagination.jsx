import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import styled from "styled-components";

const SideNavigationButton = styled.button`
  position: fixed;
  top: 55%;
  transform: translateY(-50%);
  background-color: var(--color-grey-50);
  color: var(--color-grey-700);
  border: 1px solid var(--color-grey-200);
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  opacity: 0.8;
  transition: all 0.3s;

  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-grey-50);
    color: var(--color-grey-400);
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
    opacity: 1;
  }

  // 왼쪽 버튼
  &.left {
    left: 1rem;
  }

  // 오른쪽 버튼
  &.right {
    right: 1rem;
  }

  // 모바일 화면에서는 크기를 조금 더 작게
  @media (max-width: 768px) {
    width: 3.5rem;
    height: 3.5rem;
  }
`;
export default function MobilePagination({
  currentPage,
  pageCount,
  prevPage,
  nextPage,
}) {
  // 결과가 없거나 1페이지 이하면 페이지네이션 표시 안함
  if (pageCount <= 1) return null;

  return (
    <>
      {/* 왼쪽 버튼(이전 페이지) */}
      <SideNavigationButton
        onClick={prevPage}
        disabled={currentPage === 1}
        className="left"
        aria-label="Previous page"
      >
        <HiChevronLeft />
      </SideNavigationButton>

      {/* 오른쪽 버튼(다음 페이지) */}
      <SideNavigationButton
        onClick={nextPage}
        disabled={currentPage === pageCount}
        className="right"
        aria-label="Next page"
      >
        <HiChevronRight />
      </SideNavigationButton>
    </>
  );
}
