import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { useQuery } from "../../context/QueryContext";
import { useBrowser } from "../../hooks/useBrowser";
import { useMore } from "../../hooks/useMore";
import Show from "./Show";

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  gap: 1.2rem;
  row-gap: 3rem;
  /* column-gap: 2rem; */
  border-radius: 0.9rem;
  overflow: hidden;
  align-self: flex-start;
  padding-bottom: 2rem;

  @media (max-width: 54em) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const LoadMoreButton = styled.button`
  margin-top: 1rem;
  padding: 1rem 1.6rem;
  font-size: 1.6rem;
  border: none;
  background-color: var(--color-brand-500);
  color: #fff;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-brand-600);
  }
`;

export default function SearchedShows() {
  const { searchedShows: shows } = useQuery();
  const isSmall = useBrowser();
  const count = isSmall ? 6 : 8;
  const { visibleCount, handleLoadMore } = useMore(count, count);
  const visibleShows = shows ? shows.slice(0, visibleCount) : [];

  return (
    <>
      {shows?.length > 0 ? (
        <>
          <GridRow>
            {visibleShows.map((show) => (
              <Show show={show} key={show.id} />
            ))}
          </GridRow>

          {shows && visibleCount < shows.length && (
            <LoadMoreButton onClick={handleLoadMore}>
              <FormattedMessage id="loadMore" defaultMessage="더보기" />
            </LoadMoreButton>
          )}
        </>
      ) : (
        <div>
          <FormattedMessage id="search.noData" />
        </div>
      )}
    </>
  );
}
