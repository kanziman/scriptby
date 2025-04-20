import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";
import { FormattedMessage, useIntl } from "react-intl";
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
  Backdrop,
  ContentWrapper,
  Footer,
  Header,
  OverView,
  Section,
  StyledScriptAddForm,
} from "../../ui/ScriptFormGroup";
import {
  EpisodeInfo,
  EpisodeLabel,
  EpisodeName,
  LocalizedTitle,
  OriginalTitle,
  ShowInfoWrapper,
  ShowTitle,
  YearLabel,
} from "../../ui/ShowTitleGroup";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import { shortName, toEnglishName, transform } from "../../utils/helpers";
import { useUser } from "../authentication/useUser";
import SpreadSheetImport from "../file/SpreadSheetImport";
import { useCreateScript } from "../file/useCreateScript";

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
  @media (${(props) => props.theme.media.mobile}) {
    font-size: 1.2rem;
    & select,
    button,
    input {
      font-size: 1rem;
      padding: 0.6rem;
    }
  }
`;

// helper: prepare show data by removing id and setting show_id and category
function prepareShowData(selectedShow, category) {
  if (!selectedShow) return null;
  const { id, ...rest } = selectedShow;
  return { ...rest, show_id: id, category };
}

function AddScriptForm() {
  const intl = useIntl();
  const errMessage = intl.formatMessage({
    id: "toast.error.auth",
  });
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
    overview,
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
      name: episodeName ? episodeName : name,
      original_name: originalName,
      user_id: userId,
      file_name: fName,
      show_id: showId,
      show_category: category,
      status: "pending",
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
    const updatedScript = { ...baseScript, ...transform(uploadData) };
    setNewScript(updatedScript);
    console.log("Submitted newScript:", updatedScript);
  }

  function handleOnChange(e) {
    setSelectedLanguage(e.target.value);
  }

  function handleOnClick() {
    if (!userId) {
      toast.error(errMessage);

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
          navigate("/scripts?status=pending");
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
                <OriginalTitle>{originalName}</OriginalTitle>
                {date && (
                  <YearLabel backdropColor>
                    ({format(new Date(date), "yyyy")})
                  </YearLabel>
                )}
                <LocalizedTitle backdropColor>{name}</LocalizedTitle>
              </ShowTitle>

              {isTv && (
                <>
                  <EpisodeInfo backdropColor>
                    <EpisodeLabel>Season {seasonNumber}</EpisodeLabel>
                    {" | "}
                    <EpisodeLabel>Episode {episodeNumber}</EpisodeLabel>
                  </EpisodeInfo>
                  <EpisodeName backdropColor>
                    {shortName(episodeName)}
                  </EpisodeName>
                </>
              )}
            </ShowInfoWrapper>
          </Header>

          <OverView>{overview}</OverView>
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
