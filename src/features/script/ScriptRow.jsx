import { HiEye, HiPaintBrush, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";

import { format, isToday } from "date-fns";
import { FormattedMessage } from "react-intl";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { getFlag, getLanguageName, maskEmail } from "../../utils/helpers";
import { useUser } from "../authentication/useUser";
import { useConfirm } from "./useConfirm";
import { useDeleteScript } from "./useDeleteScript";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  /* cursor: pointer; */

  & span:first-child {
    font-weight: 500;
    font-size: 1.2rem;
    @media (max-width: 50em) {
      font-size: 1rem;
    }
  }
  & span:not(:first-child) {
    color: var(--color-grey-500);
    font-size: 1rem;
    @media (max-width: 50em) {
      font-size: 0.8rem;
    }
  }

  & button {
    font-size: 0.6rem;
  }
`;
const StyledTitle = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledButton = styled.div`
  display: inline-block;
  button {
    font-size: 1rem;
  }
`;

function ScriptRow({
  script: {
    id: scriptId,
    status,
    season_number: seasonNumber,
    episode_number: episodeNumber,
    // air_date: airDate,
    // vote_count: voteCount,
    created_at: createdAt,
    original_language: originalLanguage,
    translated_language: translatedLanguage,
    user_id: scriptUserId,
    original_name: originalName,
    show: { date: firstAirDate, category },
    profile: { email, username },
  },
}) {
  const navigate = useNavigate();
  const { user: currentUser } = useUser();
  const { confirm, isPending } = useConfirm();
  const { deleteScript, isDeleting } = useDeleteScript();

  const canConfirm = currentUser?.isMaster || currentUser?.isManager;
  const canDeleteUpdate =
    currentUser?.isMaster || scriptUserId === currentUser?.id;
  const isConfirmed = status === "confirmed";
  const buttonVariation =
    status === "pending"
      ? "primary"
      : status === "confirmed"
      ? "blue"
      : "danger";

  function hanldeConfirm(e) {
    e.stopPropagation();
    let newStatus;
    if (status === "pending") {
      newStatus = "confirmed";
    } else if (status === "confirmed") {
      newStatus = "unconfirmed";
    } else if (status === "unconfirmed") {
      newStatus = "pending";
    }
    confirm({
      scriptId,
      status: newStatus,
    });
  }

  function hanldeClick() {
    navigate(`/scripts/${scriptId}`);
  }

  function hanldeDelete() {
    deleteScript(scriptId);
  }
  function hanldeUpdate(e) {
    e.stopPropagation();
    navigate(`/scripts/edit/${scriptId}`);
  }

  return (
    <>
      <Table.Row
        onClick={isConfirmed || canDeleteUpdate ? hanldeClick : undefined}
        style={{
          cursor: isConfirmed || canDeleteUpdate ? "pointer" : "not-allowed",
        }}
      >
        {/* STATUS -  */}
        <StyledButton>
          <Button
            size="small"
            onClick={hanldeConfirm}
            disabled={!canConfirm}
            variation={buttonVariation}
          >
            <FormattedMessage id={`status.${status}`} defaultMessage={status} />

            {isPending && <SpinnerMini />}
          </Button>
        </StyledButton>
        <Stacked>
          <StyledTitle>{originalName}</StyledTitle>
          <span>{format(new Date(firstAirDate), "yyyy.MM.dd")}</span>
        </Stacked>
        <Stacked>
          {category === "tv" ? <span>📺 Tv</span> : <span>🎬 Movie</span>}
          <span></span>
        </Stacked>

        <Stacked>
          {category === "tv" ? (
            <>
              <span></span>
              <span>{`Season ${seasonNumber}`}</span>
              <span>{`Episode ${episodeNumber}`}</span>
            </>
          ) : (
            <>
              <span></span>
              <span>&mdash;</span>
            </>
          )}
        </Stacked>
        <Stacked>
          <span>{getFlag(originalLanguage)}</span>
          <span>{getLanguageName(originalLanguage)}</span>
        </Stacked>
        <Stacked>
          <span>{getFlag(translatedLanguage)}</span>
          <span>{getLanguageName(translatedLanguage)}</span>
        </Stacked>

        <Stacked>
          {isToday(new Date(createdAt)) ? (
            <span>{"Today"}</span>
          ) : (
            <span>{format(new Date(createdAt), "yyyy.MM.dd")}</span>
          )}
          <span>{format(new Date(createdAt), "HH:mm:ss")}</span>
        </Stacked>

        <Stacked>
          <span>{username}</span>
          <span>{maskEmail(email)}</span>
        </Stacked>
        <Modal>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={scriptId} />
              <Menus.List id={scriptId}>
                {(isConfirmed || canDeleteUpdate) && (
                  <Menus.Button
                    icon={<HiEye />}
                    onClick={() => navigate(`/scripts/${scriptId}`)}
                  >
                    <FormattedMessage id="script.see" />
                  </Menus.Button>
                )}
                {canDeleteUpdate && (
                  <>
                    <Modal.Open opens="delete">
                      <Menus.Button icon={<HiTrash />}>
                        <FormattedMessage id="modal.menu.delete" />
                      </Menus.Button>
                    </Modal.Open>

                    <Menus.Button
                      icon={<HiPaintBrush />}
                      onClick={hanldeUpdate}
                    >
                      <FormattedMessage id="modal.menu.update" />
                    </Menus.Button>
                  </>
                )}
              </Menus.List>
            </Menus.Menu>
          </Menus>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={<FormattedMessage id="menu.script" />}
              disabled={isDeleting}
              onConfirm={hanldeDelete}
            />
          </Modal.Window>
        </Modal>
      </Table.Row>
    </>
  );
}

export default ScriptRow;
