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

  &.left {
    left: 1rem;
  }

  &.right {
    right: 1rem;
  }

  @media (max-width: 768px) {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

interface MobilePaginationProps {
  currentPage: number;
  pageCount: number;
  prevPage: () => void;
  nextPage: () => void;
}

export default function MobilePagination({
  currentPage,
  pageCount,
  prevPage,
  nextPage,
}: MobilePaginationProps): JSX.Element | null {
  if (pageCount <= 1) return null;

  return (
    <>
      <SideNavigationButton
        onClick={prevPage}
        disabled={currentPage === 1}
        className="left"
        aria-label="Previous page"
      >
        <HiChevronLeft />
      </SideNavigationButton>

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
