import { format } from "date-fns";
import { MdFiberNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FlagTextVertical from "../../ui/FlagTextVertical";
import { MetaSubGroup } from "../../ui/MetaSubGroup";
import Row from "../../ui/Row";
import { IMG_PATH } from "../../utils/constants";

const StyledItem = styled.div`
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  min-height: 30rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  /* aspect-ratio를 사용해 이미지 영역의 비율을 고정 (예: 16:9) */
  aspect-ratio: 2/3;
  overflow: hidden;
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }
`;

const NewBadge = styled.div`
  position: absolute;
  top: 1px;
  right: 1px;
  z-index: 2;
`;

const TextContainer = styled.div`
  margin-top: auto; /* 남은 공간을 모두 채워서 아래쪽에 고정 */
`;
const SubRow = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const EpisodeTitle = styled.h3`
  font-size: 1.6rem;
  color: var(--color-grey-800);
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 4.6rem;

  @media (max-width: 50em) {
    font-size: 1.4rem;
    height: 4rem;
  }
`;

const MetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-grey-100);
  padding: 1.2rem 2rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  color: var(--color-grey-600);
  margin-top: 0.8rem;
`;

function ScriptSliderItem({ item }) {
  const navigate = useNavigate();
  const {
    id,
    still_path: stillPath,
    name: episodeNameProp,
    season_number: seasonNumber,
    episode_number: episodeNumber,
    original_language: originalLanguage,
    original_name: originalName,
    translated_language,
    show,
    profile: { username },
  } = item;
  const { poster_path: posterPath, release_date: releaseDate } = show;
  const isTv = show?.first_air_date && show?.name;

  return (
    <StyledItem onClick={() => navigate(`/scripts/${id}`)}>
      <ImageWrapper>
        <img
          src={
            posterPath
              ? `${IMG_PATH}${posterPath}`
              : stillPath
              ? `${IMG_PATH}${stillPath}`
              : "https://via.placeholder.com/500x281?text=No+Image"
          }
          alt={`${originalName} poster`}
        />
        <NewBadge>
          <MdFiberNew size={24} color="red" />
        </NewBadge>
      </ImageWrapper>
      <TextContainer>
        <EpisodeTitle>{!isTv ? originalName : episodeNameProp}</EpisodeTitle>
        <MetaContainer>
          <Row type="horizontal" gap="0.4rem">
            <FlagTextVertical code={originalLanguage} />
            &rarr;
            <FlagTextVertical code={translated_language} />
          </Row>

          <SubRow>
            {isTv ? (
              <Row type="horizontal" gap="0.4rem">
                <MetaSubGroup
                  label="season"
                  boldValue={seasonNumber}
                  delimeter={"|"}
                />
                <MetaSubGroup label="episode" boldValue={episodeNumber} />
              </Row>
            ) : (
              <MetaSubGroup
                label="released"
                boldValue={format(new Date(releaseDate), "yyyy.MM.dd.")}
              />
            )}

            <MetaSubGroup label="created by" boldValue={username} />
          </SubRow>
        </MetaContainer>
      </TextContainer>
    </StyledItem>
  );
}

export default ScriptSliderItem;
