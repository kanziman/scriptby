import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { useQuery } from "../../context/QueryContext";
import { useBrowser } from "../../hooks/useBrowser";
import { useMore } from "../../hooks/useMore";
import Box from "../../ui/Box";
import LoadMoreButton from "../../ui/LoadMoreButton";
import SeasonItem from "./SeasonItem";
import ShowInfoMain from "./ShowInfoMain";
import ShowInfoSub from "./ShowInfoSub";

const StyledSeasonsHead = styled.h2`
  margin: 3rem auto;
  width: fit-content;
  gap: 1rem;
  border-bottom: 1px solid var(--color-grey-300);
  @media (${(props) => props.theme.media.mobile}) {
    font-size: 2rem;
  }
`;
const StyledSeasonList = styled.ul`
  cursor: pointer;
  transition: all 0.3s;
`;

export default function SelectedShow() {
  const { selectedShow, dispatch, state } = useQuery();
  const isSmall = useBrowser();
  const count = isSmall ? 6 : 8;
  const { visibleCount, handleLoadMore } = useMore(count, count);
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
      {seasons && (
        <StyledSeasonsHead>
          <span>📺</span>
          <span>{seasonsCount}</span>
          <span>
            <FormattedMessage id="season.seasons" />
          </span>
        </StyledSeasonsHead>
      )}
      <StyledSeasonList>
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
        <LoadMoreButton onClick={handleLoadMore}>
          <FormattedMessage id="loadMore" defaultMessage="더보기" />
        </LoadMoreButton>
      )}
    </Box>
  );
}
