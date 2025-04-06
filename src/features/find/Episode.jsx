import { format } from "date-fns";
import { HiArrowUpOnSquare, HiEye } from "react-icons/hi2";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "../../context/QueryContext";
import Flags from "../../ui/Flags";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Tag from "../../ui/Tag";
import { DEFAULT_IMAGE, IMG_PATH } from "../../utils/constants";
import { shortName } from "../../utils/helpers";
import { useUser } from "../authentication/useUser";

const StyledEpisode = styled.li`
  position: relative;
  display: grid;
  align-items: center;
  /* 이미지: 고정 너비, 콘텐츠: 유연, 메뉴: 자동 크기 */
  grid-template-columns: 13rem 1fr;
  gap: 1.4rem;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--color-grey-200);
  border-radius: 5px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    border-radius: 5px;
  }

  @media (max-width: 50rem) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
    padding: 0.8rem 1rem;
    font-size: 1.4rem;
    img {
      width: 66%;
    }
  }
`;

const EpisodeContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const EpisodeHeader = styled.div`
  color: var(--color-grey-700);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const EpisodeTitle = styled.h3`
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 2줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 1.4rem;
  margin: 0;

  @media (max-width: 34em) {
    font-size: 1rem;
  }
`;

const EpisodeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  p {
    font-size: 1.2rem;
    color: var(--color-grey-500);
    margin: 0;
    display: flex;
    align-items: center;
  }
  @media (max-width: 34em) {
    p {
      font-size: 1rem;
    }
  }
`;

const ScriptContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  padding: 0.6rem 0 0 0;
  border-radius: 5px;
  width: 100%;
  margin-top: auto;
`;

const ScriptInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  @media (max-width: 50em) {
    & > span {
      font-size: 0.8rem;
    }
  }
`;

const FlagsContainer = styled.div`
  display: flex;
  & > * {
    margin-right: -0.5rem;
  }
`;
const FlagWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

// 남은 개수를 표시할 배지(원형 배경)
const FlagBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -30%);
  background-color: var(--color-grey-300);
  color: var(--color-grey-700);
  border-radius: 50%;
  width: 1.8rem;
  height: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
`;
const MAX_FLAGS = 3;

export default function Episode({ episode }) {
  const intl = useIntl();
  const navigate = useNavigate();

  const { user: currentUser } = useUser();
  const isTutor = currentUser?.play === "tutor";

  const { selectedShow, dispatch } = useQuery();

  const {
    still_path,
    name,
    air_date,
    vote_average,
    episode_number: episodeNumber,
    scripts,
  } = episode;

  const epName = shortName(name);
  const hasScripts = scripts && scripts.length > 0;

  const uniqueScripts = scripts?.reduce((acc, script) => {
    if (
      !acc.some(
        (item) => item.translated_language === script.translated_language
      )
    ) {
      acc.push(script);
    }
    return acc;
  }, []);

  const displayedScripts = uniqueScripts?.slice(0, MAX_FLAGS);
  const extraCount = uniqueScripts?.length - MAX_FLAGS;

  function handleScriptAdd() {
    dispatch({
      type: "episodes/clicked",
      payload: { episode, showId: episode.show_id },
    });
    navigate(`/script/add`);
  }
  function handleSeeDetail(showId, epNumber) {
    navigate(`/scripts?showId=${showId}&epNumber=${epNumber}`);
  }

  return (
    <StyledEpisode>
      <img
        src={still_path ? `${IMG_PATH}${still_path}` : DEFAULT_IMAGE}
        alt={`${epName} poster`}
      />
      <EpisodeContent>
        <EpisodeHeader>
          <EpisodeTitle>
            EP {episodeNumber}. {epName}
          </EpisodeTitle>
          <EpisodeInfo>
            <p>
              <span role="img" aria-label="air date">
                🗓
              </span>
              <span>
                {format(new Date(air_date), "yyyy.MM.dd") || "Unknown"}
              </span>
            </p>
            <p>
              <span role="img" aria-label="rating">
                ⭐️
              </span>
              {vote_average.toFixed(1)}
            </p>
          </EpisodeInfo>
        </EpisodeHeader>
        <ScriptContainer>
          <ScriptInfo>
            {hasScripts ? (
              <Tag type="blue" round="square">
                {scripts.length} <FormattedMessage id="episode.scripts" />
              </Tag>
            ) : (
              <Tag type="red" round="square">
                <FormattedMessage id="episode.noScripts" />
              </Tag>
            )}
            {hasScripts && (
              <FlagsContainer>
                {displayedScripts.map((script, index) =>
                  index === MAX_FLAGS - 1 && extraCount > 0 ? (
                    <FlagWrapper key={script.id}>
                      <Flags
                        code={script.translated_language}
                        title={intl.formatMessage(
                          {
                            id: "flag.scriptTitle",
                          },
                          { language: script.translated_language }
                        )}
                      />
                      <FlagBadge>+{extraCount}</FlagBadge>
                    </FlagWrapper>
                  ) : (
                    <FlagWrapper key={script.id}>
                      <Flags
                        code={script.translated_language}
                        title={intl.formatMessage(
                          {
                            id: "flag.scriptTitle",
                          },
                          { language: script.translated_language }
                        )}
                      />
                    </FlagWrapper>
                  )
                )}
              </FlagsContainer>
            )}
          </ScriptInfo>

          <Menus>
            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={episodeNumber} />
                <Menus.List id={episodeNumber}>
                  {hasScripts && (
                    <Menus.Button
                      icon={<HiEye />}
                      onClick={() =>
                        handleSeeDetail(selectedShow.id, episodeNumber)
                      }
                    >
                      <FormattedMessage id="episode.seeDetails" />
                    </Menus.Button>
                  )}
                  {isTutor && (
                    <Menus.Button
                      icon={<HiArrowUpOnSquare />}
                      onClick={() => handleScriptAdd()}
                    >
                      <FormattedMessage id="episode.register" />
                    </Menus.Button>
                  )}
                </Menus.List>
              </Menus.Menu>
            </Modal>
          </Menus>
        </ScriptContainer>
      </EpisodeContent>
    </StyledEpisode>
  );
}
