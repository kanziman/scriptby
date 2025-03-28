import { format } from "date-fns";
import styled from "styled-components";
import { useQuery } from "../../context/QueryContext";
import FlagText from "../../ui/FlagText";
import { DEFAULT_IMAGE, IMG_PATH } from "../../utils/constants";

const StyledCard = styled.li`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* padding: 1rem; */
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* 채워지는 영역에서 제목은 위쪽, InfoRow는 아래쪽에 배치 */
  justify-content: space-between;
  flex: 1; /* 부모의 남은 공간을 모두 차지 */
  padding: 0 2rem 2rem;
  gap: 1rem;

  @media (max-width: 54em) {
    gap: 0.3rem;
    padding: 0 1rem 1rem;
  }
`;

const ShowName = styled.h3`
  margin: 0;
  font-size: 1.8rem;
  color: var(--color-grey-800);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* text-overflow: ellipsis; */

  @media (max-width: 80em) {
    font-size: 1.6rem;
  }
  @media (max-width: 70em) {
    font-size: 1.4rem;
  }
  @media (max-width: 54rem) {
    font-size: 1.2rem;
  }
`;

// InfoRow는 이제 별도의 margin-top가 필요하지 않습니다.
const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);

  @media (max-width: 54em) {
    gap: 0.2rem;
    & span {
      font-size: 1rem;
    }
  }
`;

const RowItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

export default function Show({ show }) {
  const { dispatch } = useQuery();
  const { id, name, poster, date, vote, originalLanguage } = show;

  return (
    <StyledCard
      onClick={() => dispatch({ type: "shows/clicked", payload: id })}
    >
      <ImageWrapper>
        <img
          src={poster ? `${IMG_PATH}${poster}` : DEFAULT_IMAGE}
          alt={`${name} poster`}
        />
      </ImageWrapper>
      <DetailsContainer>
        <ShowName>{name}</ShowName>
        <InfoRow>
          <RowItem>
            <FlagText code={originalLanguage} type="horizontal" />
          </RowItem>
          <RowItem>
            {date && (
              <>
                <span role="img" aria-label="calendar">
                  🗓
                </span>
                <span>{format(new Date(date), "yyyy.MM.dd")}</span>
              </>
            )}
            {date && vote && <span style={{ margin: "0 0.1rem" }}>|</span>}

            {vote && (
              <>
                <span role="img" aria-label="rating">
                  ⭐️
                </span>
                <span>{vote}</span>
              </>
            )}
          </RowItem>
        </InfoRow>
      </DetailsContainer>
    </StyledCard>
  );
}
