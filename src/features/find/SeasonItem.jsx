import { format } from "date-fns";
import styled from "styled-components";
import { DEFAULT_IMAGE, IMG_PATH } from "../../utils/constants";

const StyledSeasonItem = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: 9rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 2rem;
  align-items: center;
  padding: 1rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-200);
  border-radius: 5px;

  img,
  svg {
    width: 100%;
    grid-row: 1 / -1;
    aspect-ratio: 2 / 3;
  }
  svg {
    height: 33%;
  }
  :hover {
    background-color: var(--color-grey-200);
  }
  &.active {
    border-left: 5px solid var(--color-brand-600);
  }

  section {
    width: 100%;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 1.4rem;
    color: var(--color-grey-700);
    p {
      color: var(--color-grey-500);
    }
  }

  @media (max-width: 50rem) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    column-gap: 1rem;
    padding: 0.8rem 1rem;
    font-size: 1.4rem;

    /* 이미지 크기 줄이고 중앙 정렬 */
    img,
    svg {
      grid-row: auto;
      width: 80%;
      max-width: 8rem;
      aspect-ratio: 2 / 3;
      margin: 0 auto;
    }

    section {
      padding: 0.8rem 1rem;
      display: flex;
      flex-direction: column;
    }
    @media (max-width: 50rem) {
      section h3 {
        font-size: 1.6rem;
      }
    }
    @media (max-width: 44rem) {
      section h3 {
        font-size: 1.4rem;
      }
    }
  }
`;
const DetailedItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 1.4rem;
  @media (max-width: 50rem) {
    gap: 0.2rem;
    font-size: 1.2rem;
  }
  @media (max-width: 44rem) {
    font-size: 1rem;
  }
`;
export default function SeasonItem({ index, seasonIndex, season, dispatch }) {
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
      <img
        src={
          season.poster_path
            ? `${IMG_PATH}${season.poster_path}`
            : DEFAULT_IMAGE
        }
        alt={`${season.name} poster`}
      />
      <section>
        <h3>{season.name}</h3>
        <DetailedItem>
          <p>
            <span>🗓</span>
            <span>{format(new Date(season.air_date), "yyyy.MM.dd")}</span>
          </p>
          <p>
            <span>⭐️</span>
            {season.vote_average.toFixed(1)} TMDB rating
          </p>
          <p>
            <span>📹</span>
            <span>{`${season.episode_count} episodes`}</span>
          </p>
        </DetailedItem>
      </section>
    </StyledSeasonItem>
  );
}
