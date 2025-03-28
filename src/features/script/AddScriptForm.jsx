import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "../../context/QueryContext";
import { languages } from "../../data/IOS-639-1";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import DataItem from "../../ui/DataItem";
import FlagSelect from "../../ui/FlagSelect";
import Input from "../../ui/Input";
import {
  EpisodeInfo,
  EpisodeLabel,
  EpisodeName,
  ShowInfoWrapper,
  ShowTitle,
} from "../../ui/ShowTitleGroup";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import { shortName, toEnglishName, transform } from "../../utils/helpers";
import { useUser } from "../authentication/useUser";
import SpreadSheetImport from "../file/SpreadSheetImport";
import { useCreateScript } from "../file/useCreateScript";

const StyledScriptAddForm = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
`;
const Backdrop = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  filter: brightness(0.5);
  height: 25vh;
  width: 100%;
`;
const ContentWrapper = styled.div`
  position: absolute;
  top: 20%;
  left: 5%;
  display: flex;
  gap: 2rem;
  width: 90%;
  flex-wrap: nowrap;
`;
const Header = styled.header`
  padding: 2rem 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-brand-500);
`;
const Section = styled.section`
  padding: 3.2rem 4rem 2.4rem;
  gap: 1.6rem;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  background-color: var(--color-grey-50);
`;
const Footer = styled.footer`
  padding: 1.8rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-600);
  text-align: right;
  border-top: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-50);
  position: relative;
  p {
    font-weight: 500;
    letter-spacing: 0.5px;
  }
`;
const StyledFlagGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-self: flex-end;
`;
const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.8rem 0 2.4rem;
  border-bottom: 1px dashed var(--color-grey-300);
  margin-bottom: 1.5rem;
`;
const DataItemContainer = styled.div`
  margin-bottom: 1rem;
  transition: transform 0.2s;
  &:hover {
    transform: translateX(5px);
  }
`;

// helper: prepare show data by removing id and setting show_id and category
function prepareShowData(selectedShow, category) {
  if (!selectedShow) return null;
  const { id, ...rest } = selectedShow;
  return { ...rest, show_id: id, category };
}

function AddScriptForm() {
  const navigate = useNavigate();
  const { selectedShow, selectedEpisode, cleanedShow } = useQuery();
  const { user: currentUser } = useUser();
  const { createAll, isCreating } = useCreateScript();

  const userId = currentUser?.id;
  const {
    id: showId,
    name,
    originalLanguage,
    originalName,
    backdropPath,
    date,
    isTv,
  } = cleanedShow;

  const category = isTv ? "tv" : "movie";
  const episodeName = selectedEpisode?.name;
  const episodeNumber = selectedEpisode?.episode_number;
  const seasonNumber = selectedEpisode?.season_number;

  const [fileName, setFileName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [newScript, setNewScript] = useState();

  // add 시에는 초기값은 비워두고, SpreadSheetImport를 통해 파일 업로드 후 handleOnSubmit 호출됨
  const isAddButtonActive = useMemo(
    () => fileName && selectedLanguage,
    [fileName, selectedLanguage]
  );

  // 공통 baseScript 생성 로직
  const buildBaseScript = (fName) => {
    let baseScript = {
      original_language: originalLanguage,
      translated_language: selectedLanguage,
      original_name: originalName,
      user_id: userId,
      file_name: fName,
      show_id: showId,
      show_category: category,
    };

    if (selectedEpisode) {
      // selectedEpisode에서 episode 관련 데이터 추가 (불필요한 scripts 프로퍼티 제외)
      const { id, scripts, ...rest } = selectedEpisode;
      baseScript = { ...baseScript, ...rest, episode_id: id };
    }
    return baseScript;
  };

  function handleOnSubmit(uploadData, fName) {
    setFileName(fName);
    const baseScript = buildBaseScript(fName);
    setNewScript({ ...baseScript, ...transform(uploadData) });
  }

  function handleOnChange(e) {
    setSelectedLanguage(e.target.value);
  }

  function handleOnClick() {
    if (!userId) {
      toast.error("Should be logged in");
      return;
    }
    // newScript가 이미 세팅되어 있으면 그대로, 아니면 현재 폼 상태로 baseScript를 생성
    const scriptToUse = newScript || buildBaseScript(fileName);
    createAll(
      {
        newScript: scriptToUse,
        show: prepareShowData(selectedShow, category),
      },
      {
        onSuccess: () => {
          navigate("/scripts");
        },
      }
    );
  }

  // BACKDROP IMAGE
  const [isBackdropLoaded, setIsBackdropLoaded] = useState(false);
  useEffect(() => {
    if (backdropPath) {
      const img = new Image();
      img.src = `https://image.tmdb.org/t/p/original${backdropPath}`;
      img.onload = () => setIsBackdropLoaded(true);
      img.onerror = () => setIsBackdropLoaded(true);
    } else {
      setIsBackdropLoaded(true);
    }
  }, [backdropPath]);

  if (!isBackdropLoaded) return <Spinner />;

  return (
    <>
      <StyledScriptAddForm backdropPath={backdropPath}>
        <Backdrop
          image={`https://image.tmdb.org/t/p/original${backdropPath}`}
        />

        <ContentWrapper>
          <Header>
            <ShowInfoWrapper>
              <ShowTitle backdropColor>
                {name}
                {date && <span> ({format(new Date(date), "yyyy")})</span>}
              </ShowTitle>
              {isTv && (
                <>
                  <EpisodeInfo backdropColor>
                    <EpisodeLabel>Season {seasonNumber}</EpisodeLabel>
                    <EpisodeLabel>Episode {episodeNumber}</EpisodeLabel>
                  </EpisodeInfo>
                  <EpisodeName backdropColor>
                    {shortName(episodeName)}
                  </EpisodeName>
                </>
              )}
            </ShowInfoWrapper>
          </Header>
        </ContentWrapper>

        <Section>
          <TagGroup>
            {category === "tv" && (
              <>
                <Tag type="blue">
                  # <FormattedMessage id="scriptAdd.season" /> {seasonNumber}
                </Tag>
                <Tag type="blue">
                  # <FormattedMessage id="scriptAdd.episode" /> {episodeNumber}
                </Tag>
              </>
            )}
            <Tag type="blue">
              # <FormattedMessage id="scriptAdd.creator" />{" "}
              {currentUser?.username}
            </Tag>
            {selectedLanguage && (
              <Tag type="blue">
                # <FormattedMessage id="scriptAdd.language" />{" "}
                {toEnglishName(selectedLanguage)}
              </Tag>
            )}
            {fileName && <Tag type="blue"># {fileName}</Tag>}
          </TagGroup>

          {category === "tv" && (
            <>
              <DataItemContainer>
                <DataItem
                  icon={<HiOutlineCheckCircle />}
                  label={<FormattedMessage id="scriptAdd.season" />}
                >
                  <Input
                    id="season"
                    type="text"
                    value={seasonNumber}
                    disabled
                  />
                </DataItem>
              </DataItemContainer>
              <DataItemContainer>
                <DataItem
                  icon={<HiOutlineCheckCircle />}
                  label={<FormattedMessage id="scriptAdd.episode" />}
                >
                  <Input
                    id="episode"
                    type="text"
                    value={`${episodeNumber} (${episodeName})`}
                    disabled
                  />
                </DataItem>
              </DataItemContainer>
            </>
          )}

          <DataItemContainer>
            <DataItem
              icon={<HiOutlineCheckCircle />}
              label={<FormattedMessage id="scriptAdd.creator" />}
            >
              <Input
                id="email"
                type="text"
                value={currentUser?.email}
                disabled
              />
            </DataItem>
          </DataItemContainer>

          <DataItemContainer>
            <DataItem
              label={<FormattedMessage id="scriptAdd.language" />}
              icon={
                selectedLanguage ? (
                  <HiOutlineCheckCircle />
                ) : (
                  <HiOutlineXCircle color="red" />
                )
              }
            >
              <StyledFlagGroup>
                <FlagSelect
                  options={languages}
                  value={originalLanguage}
                  disabled
                />
                <FlagSelect
                  options={languages}
                  value={selectedLanguage}
                  onChange={handleOnChange}
                  excludeValue={originalLanguage}
                />
              </StyledFlagGroup>
            </DataItem>
          </DataItemContainer>

          <DataItemContainer>
            <DataItem
              label={<FormattedMessage id="scriptAdd.file" />}
              icon={
                fileName ? (
                  <HiOutlineCheckCircle />
                ) : (
                  <HiOutlineXCircle color="red" />
                )
              }
            >
              <SpreadSheetImport
                handleOnSubmit={handleOnSubmit}
                isCreating={isCreating}
                fileName={fileName}
              />
            </DataItem>
          </DataItemContainer>
        </Section>
        <Footer>
          <p>{format(new Date(), "EEE, MMM dd yyyy, p")}</p>
        </Footer>
      </StyledScriptAddForm>

      <ButtonGroup>
        <Button
          disabled={!isAddButtonActive || isCreating}
          variation={isAddButtonActive ? "primary" : "inactive"}
          onClick={handleOnClick}
        >
          <FormattedMessage id="button.submit" />
        </Button>
      </ButtonGroup>
    </>
  );
}

export default AddScriptForm;
