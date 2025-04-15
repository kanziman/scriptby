import { useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "../../context/QueryContext";
import ErrorMessage from "../../ui/ErrorMessage";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Episodes from "./Episodes";
import Search from "./Search";
import SearchedShows from "./SearchedShows";
import SelectedShow from "./SelectedShow";

const RowGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 5rem;
  min-height: 30vh;
  padding: 0 1rem;

  @media (${(props) => props.theme.media.tablet}) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  @media (${(props) => props.theme.media.mobile}) {
    padding: 0;
    gap: 1rem;
  }
`;

function Find() {
  const { episodes, selectedShow, loading, error, dispatch } = useQuery();
  const { isShowsLoading, isSeasonsLoading, isEpisodesLoading } = loading;

  // 페이지 unmount 시 episodes 초기화
  useEffect(() => {
    return () => {
      dispatch({ type: "episodes/update", payload: [] });
    };
  }, [dispatch]);

  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <Row type="horizontal">
        <Search />
      </Row>

      {isShowsLoading && <Spinner />}
      {!selectedShow && <SearchedShows />}

      <RowGrid>
        {isSeasonsLoading && <Spinner />}
        {selectedShow && <SelectedShow />}

        {isEpisodesLoading && <Spinner />}
        {episodes?.length > 0 && <Episodes />}
      </RowGrid>
    </>
  );
}

export default Find;
