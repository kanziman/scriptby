import styled from "styled-components";
import { useQuery } from "../../context/QueryContext";
import { useMore } from "../../hooks/useMore";
import Box from "../../ui/Box";
import ErrorMessage from "../../ui/ErrorMessage";
import LoadMoreButton from "../../ui/LoadMoreButton";
import Spinner from "../../ui/Spinner";
import Episode from "./Episode";
import { useEpisode } from "./useEpisode";
const StyledEpisodes = styled.ul`
  transition: all 0.3s;
  overflow: scroll;
  overflow-x: hidden;
  /* 스크롤바 감추기 */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  flex: 1;
`;

export default function Episodes() {
  const { episodes, selectedShow } = useQuery();
  const { visibleCount, handleLoadMore } = useMore(6, 6);

  const { isPending, error } = useEpisode(selectedShow?.id);

  const visibleEpisodes = episodes ? episodes.slice(0, visibleCount) : [];

  // 로딩 상태 처리 추가
  if (isPending) return <Spinner />;
  if (error) return <ErrorMessage />;
  return (
    <>
      <Box>
        <StyledEpisodes>
          {visibleEpisodes.map((episode) => (
            <Episode episode={episode} key={episode.id} />
          ))}
        </StyledEpisodes>
        {episodes && visibleCount < episodes.length && (
          <LoadMoreButton onClick={handleLoadMore}>더보기</LoadMoreButton>
        )}
      </Box>
    </>
  );
}
