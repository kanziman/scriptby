import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { FormattedMessage } from "react-intl";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 34em) {
    & p {
      /* font-size: 1.2rem; */
    }
  }
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  color: var(--color-grey-500);
`;

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
`;

function Pagination({ count, size }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / (size || PAGE_SIZE));
  // console.log("count size:", count, size);
  // console.log("total pageCount:", pageCount);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      {size ? (
        <P>
          <FormattedMessage
            id="results.summary.lines"
            defaultMessage="{size} lines of total ({count})"
            values={{ size, count }}
          />
        </P>
      ) : (
        <P>
          <FormattedMessage
            id="results.summary.pagination"
            defaultMessage="{start} ~ {end} of {count} results"
            values={{
              start: (currentPage - 1) * PAGE_SIZE + 1,
              end: currentPage === pageCount ? count : currentPage * PAGE_SIZE,
              count,
            }}
          />
        </P>
      )}

      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft />{" "}
          <span>
            <FormattedMessage
              id="pagination.previous"
              defaultMessage="Previous"
            />
          </span>
        </PaginationButton>

        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>
            <FormattedMessage id="pagination.next" defaultMessage="Next" />
          </span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
