import { format } from "date-fns";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FlagTextSlide from "../../ui/FlagTextSlide";
import { MetaContainer, MetaSubGroup } from "../../ui/MetaSubGroup";
import Row from "../../ui/Row";
import { IMG_PATH } from "../../utils/constants";
import { cleansingData } from "../../utils/helpers";

const StyledItem = styled.div`
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  min-height: 28rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 7/10;
  overflow: hidden;
  border-radius: 0.5rem 0.5rem 0 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${StyledItem}:hover & {
    transform: scale(1.05);
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--color-tertiary-700);
  padding: 0.3rem 0.6rem;
  border-radius: 0.4rem;
  font-size: 0.8rem;
  font-weight: bold;
  z-index: 2;
`;
const FlagWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 0rem;
  display: flex;
  justify-content: center;
  z-index: 2;
`;
const FlagTextWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  padding: 0.4rem;
  display: flex;
  justify-content: center;
  z-index: 2;
  border-radius: 0 0 0.5rem 0.5rem;
  margin-bottom: 1rem;
`;

function ScriptSliderItem({ item: script }) {
  const intl = useIntl();
  const navigate = useNavigate();
  const {
    id,
    still_path: stillPath,
    season_number: seasonNumber,
    episode_number: episodeNumber,
    original_language: originalLanguage,
    original_name: originalName,
    translated_language: translatedLanguage,
    show,
    profile,
  } = script;

  const { poster, date, isTv } = cleansingData(show);
  const { username } = profile;

  return (
    <StyledItem onClick={() => navigate(`/scripts/${id}`)}>
      <ImageWrapper>
        <Image
          src={
            poster
              ? `${IMG_PATH}${poster}`
              : stillPath
              ? `${IMG_PATH}${stillPath}`
              : "https://via.placeholder.com/500x281?text=No+Image"
          }
          alt={`${originalName} poster`}
        />

        <Badge>
          {intl.formatMessage({
            id: "badge.new",
          })}
        </Badge>

        <FlagWrapper>
          <Row type="horizontal" gap="1rem" style={{ color: "white" }}>
            <FlagTextSlide code={originalLanguage} flagOnly />
            <span style={{ fontSize: "1.2rem" }}>&rarr;</span>
            <FlagTextSlide code={translatedLanguage} flagOnly />
          </Row>
        </FlagWrapper>
      </ImageWrapper>

      <FlagTextWrapper>
        <Row type="horizontal" gap="0.4rem" style={{ color: "white" }}>
          <FlagTextSlide code={originalLanguage} textOnly />
          <span style={{ fontSize: "1.2rem" }}>&rarr;</span>
          <FlagTextSlide code={translatedLanguage} textOnly />
        </Row>
      </FlagTextWrapper>

      <Row>
        <MetaContainer title={originalName}>
          {isTv ? (
            <>
              <MetaSubGroup
                label={intl.formatMessage({
                  id: "meta.season",
                })}
                value={seasonNumber}
                delimiter={"|"}
                label1={intl.formatMessage({
                  id: "meta.episode",
                })}
                value1={episodeNumber}
              />
            </>
          ) : (
            <MetaSubGroup
              label={intl.formatMessage({
                id: "meta.released",
              })}
              value={format(new Date(date), "yyyy.MM.dd.")}
            />
          )}

          <MetaSubGroup
            label={intl.formatMessage({
              id: "meta.createdBy",
            })}
            value={username}
          />
        </MetaContainer>
      </Row>
    </StyledItem>
  );
}

export default ScriptSliderItem;
