import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { useQuery } from "../../context/QueryContext";
import { useMore } from "../../hooks/useMore";
import Box from "../../ui/Box";
import LoadMoreButton from "../../ui/LoadMoreButton";
import SeasonItem from "./SeasonItem";
import ShowInfoMain from "./ShowInfoMain";
import ShowInfoSub from "./ShowInfoSub";

const StyledSeasonList = styled.ul`
  cursor: pointer;
  transition: all 0.3s;

  h1,
  h2 {
    margin: 1rem auto;
    width: fit-content;
    gap: 1rem;
    border-bottom: 1px solid var(--color-grey-300);
  }

  /* display: flex;
  flex-direction: column;
  flex: 1; */
`;

export default function SelectedShow() {
  const { selectedShow, dispatch, state } = useQuery();
  const { visibleCount, handleLoadMore } = useMore(6, 6);
  const seasons = selectedShow?.seasons;
  const seasonsCount = seasons?.length;

  // if tv shows(and have seasons)
  const visibleSeasons = seasons ? seasons.slice(0, visibleCount) : [];
  return (
    <Box>
      {/* SHOW or MOVIE */}
      <ShowInfoMain />
      <ShowInfoSub />

      {/* SEASEAONS */}
      <StyledSeasonList>
        {seasons && (
          <h2>
            <span>📺</span>
            <span>{seasonsCount}</span>
            <span>
              <FormattedMessage id="season.seasons" />
            </span>
          </h2>
        )}

        {visibleSeasons.map((season, index) => (
          <SeasonItem
            seasonIndex={state.seasonIndex}
            season={season}
            key={season.id}
            index={index}
            dispatch={dispatch}
          />
        ))}
      </StyledSeasonList>

      {/* LOAD MORE */}
      {seasons && visibleCount < seasons.length && (
        <LoadMoreButton onClick={handleLoadMore}>더보기</LoadMoreButton>
      )}
    </Box>
  );
}
