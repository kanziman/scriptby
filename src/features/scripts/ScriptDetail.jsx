import { format, isToday } from "date-fns";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
import Modal from "../../ui/Modal";
import {
  EpisodeInfo,
  EpisodeLabel,
  EpisodeName,
  ShowInfoWrapper,
  ShowTitle,
} from "../../ui/ShowTitleGroup";
import Spinner from "../../ui/Spinner";
import { formatDistanceFromNow, shortName } from "../../utils/helpers";
import { useUser } from "../authentication/useUser";
import { useDeleteScript } from "../script/useDeleteScript";
import Screen from "./Screen";
import { useScriptOne } from "./useScriptOne";

// 상단 레이아웃 컨테이너 - ShowInfoWrapper를 위한 컨테이너
const TopLayout = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
`;

// 작가 정보를 오른쪽에 배치하기 위한 컨테이너
const AuthorContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 1rem;
`;

// Author info styled component
const AuthorInfoWrapper = styled.div`
  padding: 1rem 1.4rem;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const AuthorName = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 0.2rem;

  @media (max-width: 34em) {
    font-size: 1.2rem;
  }
`;

const AuthorDate = styled.div`
  font-size: 1.2rem;
  color: #666;
  @media (max-width: 34em) {
    font-size: 1rem;
  }
`;
const ByPrefix = styled.span`
  font-weight: 400;
  font-style: italic;
  color: #666;
  margin-right: 0.2rem;
`;

const WriterGroupButton = styled.div`
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
  gap: 1rem;
  margin-bottom: 2rem;
`;
function ScriptDetail() {
  const navigate = useNavigate();
  const intl = useIntl();
  const resourceName = intl.formatMessage({ id: "menu.script" });
  const { scriptId } = useParams();
  const {
    episodeName,
    isPending,
    episodeNumber,
    seasonNumber,
    show,
    createdAt,
    profile = {},
  } = useScriptOne({ scriptId });
  const { deleteScript, isDeleting } = useDeleteScript();

  const { user: currentUser } = useUser();
  const { username } = profile;
  const isWriter = currentUser?.id === profile?.id;
  const canDeleteUpdate = currentUser?.isMaster || isWriter;

  if (isPending) return <Spinner />;
  if (!scriptId) {
    return <Empty resource={resourceName} />;
  }

  return (
    <div>
      {/* ShowInfoWrapper를 위한 전체 너비 레이아웃 */}
      <>
        <TopLayout>
          {show?.category === "tv" ? (
            <ShowInfoWrapper>
              <ShowTitle>{show?.originalName}</ShowTitle>
              <EpisodeInfo>
                <EpisodeLabel>Season {seasonNumber}</EpisodeLabel>
                {" | "}
                <EpisodeLabel>Episode {episodeNumber}</EpisodeLabel>
              </EpisodeInfo>
              <EpisodeName>{shortName(episodeName)}</EpisodeName>
            </ShowInfoWrapper>
          ) : (
            <ShowInfoWrapper>
              <ShowTitle>{show?.originalName}</ShowTitle>
            </ShowInfoWrapper>
          )}
        </TopLayout>

        {/* 작가 정보를 오른쪽에 배치하는 컨테이너 */}
        <AuthorContainer>
          <AuthorInfoWrapper>
            <AuthorName>
              <AuthorName>
                <ByPrefix>by </ByPrefix>
                {username || "Anonymous"}
              </AuthorName>
            </AuthorName>
            <AuthorDate dateTime={createdAt}>
              {isToday(new Date(createdAt))
                ? formatDistanceFromNow(createdAt)
                : format(new Date(createdAt), "yyyy.MM.dd")}
            </AuthorDate>
          </AuthorInfoWrapper>
        </AuthorContainer>

        {/* IF WRITER, MENU BUTTONS*/}
        {canDeleteUpdate && (
          <WriterGroupButton>
            <Modal>
              <Button
                size="small"
                onClick={() => navigate(`/scripts/edit/${scriptId}`)}
              >
                <FormattedMessage id="modal.menu.edit" />
              </Button>

              <Modal.Open opens="delete">
                <Button size="small" variation="danger">
                  <FormattedMessage id="modal.menu.delete" />
                </Button>
              </Modal.Open>

              {/* Modal Windows */}
              <Modal.Window name="delete">
                <ConfirmDelete
                  resource={<FormattedMessage id="menu.scripts" />}
                  disabled={isDeleting}
                  onConfirm={() => deleteScript(scriptId)}
                />
              </Modal.Window>
            </Modal>
          </WriterGroupButton>
        )}
      </>

      {/* MAIN */}
      <Screen />
    </div>
  );
}

export default ScriptDetail;
