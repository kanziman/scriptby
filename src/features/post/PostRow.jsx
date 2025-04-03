import styled from "styled-components";

import { HiPencil, HiTrash } from "react-icons/hi2";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import MetaData from "../../ui/MetaData";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { useUser } from "../authentication/useUser";
import { useDeletePost } from "./useDeletePost";

const Img = styled.img`
  display: block;
  width: 5.2rem;
  aspect-ratio: 4/3;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
  align-self: center;
  justify-self: end;
  transform: scale(1.3);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.5);
    overflow: hidden;
  }
  @media (max-width: 34em) {
    width: 50%;
  }
  /* transform: scale(1.5) translateX(-7px); */
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  @media (max-width: 34em) {
    & span {
      font-size: 1rem;
    }
  }
`;
const StyledLink = styled(Link)`
  &:visited {
    color: var(--color-grey-400); /* 방문 후 색상 */
  }
  color: var(--color-grey-600);
`;

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  @media (max-width: 34em) {
    font-size: 1.2rem;
  }
`;
const RowGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
`;

function PostRow({ data }) {
  const navigate = useNavigate();

  const { isDeleting, deletePost } = useDeletePost();
  const {
    id: postId,
    title,
    created_at: createdAt,
    user_id: userId,
    view,
    profile,
    thumb,
  } = data;
  const { user: currentUser } = useUser();
  const isWriter = currentUser?.id === userId;
  // const avatar = user?.user_metadata?.avatar || "/default-user.jpg";

  return (
    <Table.Row>
      <StyledLink to={`/posts/${postId}`}>
        <RowGrid>
          <Stacked>
            <Title>{title}</Title>
            <MetaData
              username={profile.username}
              createdAt={createdAt}
              view={view}
            />
          </Stacked>

          {thumb && <Img src={thumb} alt="post image" />}
        </RowGrid>
      </StyledLink>

      <>
        {(isWriter || currentUser?.isMaster) && (
          <Modal>
            <Menus>
              <Menus.Menu>
                <Menus.Toggle id={postId} />

                <Menus.List id={postId}>
                  <Modal.Open opens="edit">
                    <Menus.Button
                      onFuncFromOutside={() =>
                        navigate(`/posts/edit/${postId}`)
                      }
                      icon={<HiPencil />}
                    >
                      <FormattedMessage id="modal.menu.edit" />
                    </Menus.Button>
                  </Modal.Open>

                  <Modal.Open opens="delete">
                    <Menus.Button icon={<HiTrash />}>
                      <FormattedMessage id="modal.menu.delete" />
                    </Menus.Button>
                  </Modal.Open>
                </Menus.List>
              </Menus.Menu>
            </Menus>
            <Modal.Window name="delete">
              <ConfirmDelete
                resource="post"
                disabled={isDeleting}
                onConfirm={() => deletePost(postId)}
              />
            </Modal.Window>
            <Modal.Window name="edit"></Modal.Window>
          </Modal>
        )}
      </>
    </Table.Row>
  );
}

export default PostRow;
