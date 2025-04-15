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
  height: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: var(--color-grey-50);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2/3;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 1rem;
  padding-top: 3rem;
`;

const ShowName = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (${(props) => props.theme.media.tablet}) {
    font-size: 1.2rem;
  }
`;

const DetailsContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-grey-50);
`;

const InfoItems = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-grey-600);
  font-size: 1.1rem;
  flex-wrap: wrap;

  @media (${(props) => props.theme.media.tablet}) {
    font-size: 1rem;
    gap: 0.4rem;
  }
  @media (${(props) => props.theme.media.mobile}) {
    gap: 0.2rem;
    font-size: 0.8rem;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 600;
  color: var(--color-grey-800);
  background-color: var(--color-grey-100);
  padding: 0.3rem 0.6rem;
  border-radius: 1rem;

  span[role="img"] {
    font-size: 1rem;
  }

  @media (${(props) => props.theme.media.tablet}) {
    font-size: 1.2rem;
  }
  @media (${(props) => props.theme.media.mobile}) {
    font-size: 1rem;
  }
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
        <Overlay>
          <ShowName>{name}</ShowName>
        </Overlay>
      </ImageWrapper>

      <DetailsContainer>
        <InfoItems>
          <InfoItem>
            <FlagText code={originalLanguage} type="horizontal" />
          </InfoItem>

          {date && (
            <InfoItem>
              <span role="img" aria-label="calendar">
                🗓
              </span>
              <span>{format(new Date(date), "yyyy")}</span>
            </InfoItem>
          )}
        </InfoItems>

        {vote && (
          <Rating>
            <span role="img" aria-label="rating">
              ⭐️
            </span>
            <span>{vote}</span>
          </Rating>
        )}
      </DetailsContainer>
    </StyledCard>
  );
}
