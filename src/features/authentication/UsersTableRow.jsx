import styled from "styled-components";

import { format } from "date-fns";
import { useMemo } from "react";
import { HiEye, HiTrash } from "react-icons/hi2";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import SpinnerMini from "../../ui/SpinnerMini";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { useUpdateUser } from "./useUpdateUser";
import { useUser } from "./useUser";
const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;
const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const ROLE_SETTINGS = {
  user: { tag: "blue", label: "사용자" },
  authenticated: { tag: "blue", label: "사용자" },
  manager: { tag: "green", label: "관리자" },
  master: { tag: "silver", label: "마스터" },
};

const NEXT_ROLE = {
  user: "manager",
  manager: "master",
  master: "user",
};

function UsersTableRow({ user }) {
  const { email, id, role, username, created_at, alive, play } = user;
  const { updateUser, isUpdating } = useUpdateUser();
  const { user: currentUser } = useUser();
  const avatar = user?.avatar_url || "/default-user.jpg";

  // role 관련 설정을 메모이제이션
  const roleConfig = useMemo(
    () => ROLE_SETTINGS[role] || { tag: "gray", label: "미정" },
    [role]
  );

  // 권한 체크 로직
  const canUpdateRole = useMemo(() => {
    if (!currentUser) return false;
    if (currentUser.role === "master") return true;
    if (currentUser.role === "manager" && role === "user") return true;
    return false;
  }, [currentUser, role]);

  const handleRoleUpdate = () => {
    if (!canUpdateRole || isUpdating) return;

    const nextRole = NEXT_ROLE[role];
    if (!nextRole) return;

    updateUser({
      userId: id,
      email,
      username,
      role: nextRole,
    });
  };

  function handleTutorRequest() {
    if (!user) return;

    updateUser({ id, play: play === "requested" ? "tutor" : "" });
  }
  return (
    <Table.Row>
      <Stacked>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <Avatar src={avatar} alt={`Avatar of ${username}`} />
      </Stacked>
      <Stacked>
        <span>{username} </span>
      </Stacked>

      <Tag type={ROLE_SETTINGS[role]["tag"]}>{role?.replace("-", " ")}</Tag>

      <Stacked>
        {play === "requested" ? (
          <Button variation="danger" size="small" onClick={handleTutorRequest}>
            {play}
          </Button>
        ) : (
          <span>{play} </span>
        )}
      </Stacked>
      <Stacked>
        <span>{alive} </span>
      </Stacked>

      <Stacked>
        <span>{format(new Date(created_at), "EEE, MMM dd yyyy")} </span>
      </Stacked>

      <Button
        size="small"
        onClick={handleRoleUpdate}
        disabled={!canUpdateRole || isUpdating}
      >
        {roleConfig.label}
        {isUpdating && <SpinnerMini />}
      </Button>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Menus.Button icon={<HiEye />}>See details</Menus.Button>

            {currentUser?.role === "manager" && (
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
              </Modal.Open>
            )}
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            // disabled={isDeleting}
            // onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default UsersTableRow;
