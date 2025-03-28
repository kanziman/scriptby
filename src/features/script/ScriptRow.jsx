import { HiPaintBrush, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";

import { format, isToday } from "date-fns";
import { useQuery } from "../../context/QueryContext";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { getFlag, getLanguageName, maskEmail } from "../../utils/helpers";
import { useUser } from "../authentication/useUser";
import { useConfirm } from "../scripts/shows/useConfirm";
import { useDeleteScript } from "../scripts/useDeleteScript";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  cursor: pointer;

  & span:first-child {
    font-weight: 500;

    @media (max-width: 50em) {
      font-size: 1.2rem;
    }
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1rem;
    @media (max-width: 50em) {
      font-size: 0.8rem;
    }
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
  isAdminPage,
}) {
  const navigate = useNavigate();
  const { user: currentUser } = useUser();
  const { confirm, isPending } = useConfirm();
  const { deleteScript, isDeleting } = useDeleteScript();
  const { dispatch } = useQuery();

  const userRole = currentUser?.role;

  const canConfirm = currentUser?.isMaster || currentUser?.isManager;
  const canDeleteUpdate =
    userRole === "master" || scriptUserId === currentUser?.id;
  const isConfirmed = status === "confirmed";

  function hanldeConfirm(e) {
    e.stopPropagation();
    confirm({
      scriptId,
      status: status === "confirmed" ? "unconfirmed" : "confirmed",
    });
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
      <Table.Row onClick={() => navigate(`/scripts/${scriptId}`)}>
        <Stacked>
          {category === "tv" ? <span>📺 Tv</span> : <span>🎬 Movie</span>}
          <span></span>
        </Stacked>
        <Stacked>
          <span>
            <>{originalName}</>
          </span>
          <span>{format(new Date(firstAirDate), "yyyy.MM.dd")}</span>
        </Stacked>
        <Stacked>
          {category === "tv" ? (
            <>
              <span>{`Season ${seasonNumber}`}</span>
              <span>{`Episode ${episodeNumber}`}</span>
            </>
          ) : (
            <>&mdash;</>
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

        {/* STATUS -  */}
        {isAdminPage && (
          <Button
            size="small"
            onClick={hanldeConfirm}
            disabled={!canConfirm}
            variation={isConfirmed ? "blue" : "danger"}
          >
            {status.replace("-", " ")}
            {isPending && <SpinnerMini />}
          </Button>
        )}

        <Modal>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={scriptId} />
              <Menus.List id={scriptId}>
                {/* <Menus.Button
                  icon={<HiEye />}
                  onClick={() => navigate(`/scripts/${scriptId}`)}
                >
                  See details
                </Menus.Button> */}

                {canDeleteUpdate && (
                  <>
                    <Modal.Open opens="delete">
                      <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                    </Modal.Open>

                    <Menus.Button
                      icon={<HiPaintBrush />}
                      onClick={hanldeUpdate}
                    >
                      Update
                    </Menus.Button>
                  </>
                )}
              </Menus.List>
            </Menus.Menu>
          </Menus>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="script"
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
