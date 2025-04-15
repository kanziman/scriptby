import { format } from "date-fns";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { DEFAULT_IMAGE, IMG_PATH } from "../../utils/constants";

const StyledSeasonItem = styled.li`
  position: relative;
  display: flex;
  padding: 1.2rem;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  margin-bottom: 1rem;
  background-color: var(--color-grey-100);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(--color-grey-200);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &.active {
    border-left: 5px solid var(--color-brand-600);
    background-color: var(--color-grey-200);
  }

  @media (${(props) => props.theme.media.tablet}) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const PosterContainer = styled.div`
  flex-shrink: 0;
  width: 9rem;
  margin-right: 3rem;

  img {
    width: 100%;
    border-radius: 8px;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  @media (${(props) => props.theme.media.tablet}) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1rem;

    img {
      width: 30%;
      aspect-ratio: 3 / 4;
      margin: 0 auto;
      display: block;
    }
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SeasonName = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.6rem;
  color: var(--color-grey-800);
  /* align-self: center; */
  /* margin: 1rem auto; */
  @media (${(props) => props.theme.media.tablet}) {
    font-size: 1.6rem;
  }
`;

const DetailedItem = styled.section`
  display: grid;
  gap: 0.4rem;
  font-size: 1.4rem;
  color: var(--color-grey-600);

  @media (${(props) => props.theme.media.tablet}) {
    grid-template-columns: 1fr;
    gap: 0rem;
    font-size: 1.2rem;
  }

  @media (${(props) => props.theme.media.mobile}) {
    font-size: 1rem;
  }
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;

  span:first-child {
    margin-right: 0.5rem;
  }
`;

export default function SeasonItem({ index, seasonIndex, season, dispatch }) {
  // Handle cases where air_date might be null
  const formattedDate = season.air_date
    ? format(new Date(season.air_date), "yyyy.MM.dd")
    : "N/A";

  return (
    <StyledSeasonItem
      className={seasonIndex === index ? "active" : ""}
      onClick={() =>
        dispatch({
          type: "seasons/clicked",
          payload: [season.season_number, index],
        })
      }
    >
      <PosterContainer>
        <img
          src={
            season.poster_path
              ? `${IMG_PATH}${season.poster_path}`
              : DEFAULT_IMAGE
          }
          alt={`${season.name} poster`}
          loading="lazy"
        />
      </PosterContainer>

      <ContentContainer>
        <SeasonName>{season.name}</SeasonName>
        <DetailedItem>
          <DetailRow>
            <span aria-hidden="true">🗓</span>
            <span>{formattedDate}</span>
          </DetailRow>
          <DetailRow>
            <span aria-hidden="true">⭐️</span>
            <span>{season.vote_average.toFixed(1)}</span>
          </DetailRow>
          <DetailRow>
            <span aria-hidden="true">📹</span>
            <span>
              <FormattedMessage
                id="season.episodes"
                defaultMessage="{count} episodes"
                values={{ count: season.episode_count }}
              />
            </span>
          </DetailRow>
        </DetailedItem>
      </ContentContainer>
    </StyledSeasonItem>
  );
}
