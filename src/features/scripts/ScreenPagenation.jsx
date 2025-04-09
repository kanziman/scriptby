import React, { useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { FormattedMessage } from "react-intl";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../../utils/constants";

const StyledScreenPagenation = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
  color: var(--color-grey-500);
  @media (max-width: 50em) {
    font-size: 1rem;
    gap: 0.4rem;
  }
`;

const Span = styled.span``;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  @media (max-width: 50em) {
    font-size: 1.2rem;
  }
`;

function ScreenPagenation({ count, isToggled }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const rawPageSize = PAGE_SIZE;
  const pageSize = isToggled ? 2 * rawPageSize : rawPageSize;

  // 🔁 토글 변경 시 현재 start index 기반으로 새로운 page 설정
  useEffect(() => {
    const currentRawPage = Number(searchParams.get("page")) || 1;
    const currentStartIndex =
      (currentRawPage - 1) * (isToggled ? rawPageSize : 2 * rawPageSize);
    const newPage = Math.floor(currentStartIndex / pageSize) + 1;

    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  }, [isToggled]);

  const pageCount = Math.ceil(count / pageSize);
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, count);

  function nextPage() {
    const next = currentPage < pageCount ? currentPage + 1 : currentPage;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage > 1 ? currentPage - 1 : currentPage;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <StyledScreenPagenation>
      <P>
        <FormattedMessage
          id="results.summary.pagination"
          defaultMessage="{start} ~ {end} of {count} results"
          values={{ start: startIndex, end: endIndex, count }}
        />
      </P>

      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft />
          <Span>
            <FormattedMessage
              id="pagination.previous"
              defaultMessage="Previous"
            />
          </Span>
        </PaginationButton>

        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <Span>
            <FormattedMessage id="pagination.next" defaultMessage="Next" />
          </Span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledScreenPagenation>
  );
}

export default ScreenPagenation;
