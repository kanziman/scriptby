import styled from "styled-components";

import { HiPencil, HiTrash } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import MetaData from "../../ui/MetaData";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { statusToTagName } from "../../utils/constants";
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

  &:hover {
    transform: scale(1.5);
    overflow: hidden;
  }
  /* transform: scale(1.5) translateX(-7px); */
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;
const Sided = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-700);
  margin: 0;
`;

const RowGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
`;
const StyledLink = styled(Link)`
  &:visited {
    color: var(--color-grey-400);
  }
  color: var(--color-grey-600);
`;
function PostRowNotice({ data }) {
  const navigate = useNavigate();
  const {
    id: postId,
    title,
    created_at: createdAt,
    user_id: userId,
    view,
    profile,
    thumb,
    type,
  } = data;
  const { user: currentUser } = useUser();
  const { isDeleting, deletePost } = useDeletePost();
  // const avatar = user?.user_metadata?.avatar || "/default-user.jpg";
  return (
    <Table.Row type="posts">
      <StyledLink to={`/posts/${postId}`}>
        <RowGrid>
          <Stacked>
            <Sided>
              <Tag round="square" type={statusToTagName[type]}>
                {type}
              </Tag>
              <Title>{title}</Title>
            </Sided>
            <MetaData
              username={profile.username}
              createdAt={createdAt}
              view={view}
            />
          </Stacked>

          {thumb && <Img src={thumb} alt="post image" />}
        </RowGrid>
      </StyledLink>

      {currentUser?.isManager && (
        <>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={postId} />

              <Menus.List id={postId}>
                <Modal.Open opens="edit">
                  <Menus.Button
                    onFuncFromOutside={() => navigate(`/posts/edit/${postId}`)}
                    icon={<HiPencil />}
                  >
                    Edit
                  </Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>
            <Modal.Window name="delete">
              <ConfirmDelete
                resource="posts"
                disabled={isDeleting}
                onConfirm={() => deletePost(postId)}
              />
            </Modal.Window>
          </Modal>
        </>
      )}
    </Table.Row>
  );
}

export default PostRowNotice;
