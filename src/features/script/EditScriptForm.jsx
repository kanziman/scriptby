import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
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
import { useUpdateScript } from "../file/useUpdateScript";

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

/**
 * EditScriptForm (편집 전용)
 *
 * props:
 * - translatedLanguage: 기존 번역 언어
 * - uploadFileName: 기존 업로드된 파일 이름
 * - scriptId: 수정할 스크립트의 id
 * - show: 편집 대상 show 데이터 (객체)
 * - episode: 편집 대상 episode 데이터 (객체, optional)
 */
function EditScriptForm({
  translatedLanguage,
  uploadFileName,
  scriptId,
  show,
  episode,
  profile,
}) {
  const navigate = useNavigate();
  const intl = useIntl();
  const errMessage = intl.formatMessage({
    id: "toast.error.auth",
  });
  const { user: currentUser } = useUser();
  const { editAll, isUpdating } = useUpdateScript();
  const userId = profile?.id;

  const {
    name,
    originalLanguage,
    originalName,
    category,
    backdropPath,
    date,
    overview,
  } = show;
  const episodeName = episode?.episodeName;
  const episodeNumber = episode?.episodeNumber;
  const seasonNumber = episode?.seasonNumber;

  const [fileName, setFileName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [newScript, setNewScript] = useState();

  // 편집 모드 초기값 설정
  useEffect(() => {
    if (translatedLanguage && uploadFileName) {
      setSelectedLanguage(translatedLanguage);
      setFileName(uploadFileName);
    }
  }, [translatedLanguage, uploadFileName]);

  const isButtonActive = useMemo(
    () => fileName && selectedLanguage,
    [fileName, selectedLanguage]
  );

  // 공통 baseScript 생성 함수 (파일명은 인자로 받음)
  const buildBaseScript = (fName) => {
    let baseScript = {
      original_language: originalLanguage,
      translated_language: selectedLanguage,
      name,
      original_name: originalName,
      user_id: userId,
      file_name: fName,
      show_category: category,
      status: "pending",
    };
    // if (selectedEpisode && category === "tv") {
    //   // selectedEpisode에서 불필요한 scripts 속성은 제거
    //   const { id, scripts, ...rest } = selectedEpisode;
    //   baseScript = { ...baseScript, ...rest, episode_id: id };
    // }
    return baseScript;
  };

  function handleOnSubmit(uploadData, fName) {
    // 파일 이름을 업데이트하고 즉시 buildBaseScript에 전달
    setFileName(fName);
    const baseScript = buildBaseScript(fName);
    setNewScript({ ...baseScript, ...transform(uploadData), id: scriptId });
  }

  function handleOnChange(e) {
    setSelectedLanguage(e.target.value);
  }

  function handleOnClick() {
    if (!userId) {
      toast.error(errMessage);
      return;
    }
    // newScript가 이미 준비되어 있으면 그대로, 아니면 현재 상태로 baseScript 생성
    const scriptToUse = newScript || {
      id: scriptId,
      ...buildBaseScript(fileName),
    };
    editAll(
      {
        newScript: scriptToUse,
        // Don't update show data when EDIT
        // show: prepareShowData(selectedShow, category),
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
              {category === "tv" && (
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

          <OverView>{overview}</OverView>
        </ContentWrapper>

        <Section>
          {/* 태그 그룹 */}
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
              <Input id="email" type="text" value={profile?.email} disabled />
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
          disabled={!isButtonActive || isUpdating}
          variation={isButtonActive ? "primary" : "inactive"}
          onClick={handleOnClick}
        >
          <FormattedMessage id="button.modify" />
        </Button>
      </ButtonGroup>
    </>
  );
}

export default EditScriptForm;
