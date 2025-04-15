import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { POST_TYPE_OPTIONS, statusToTagName } from "../../utils/constants";

import { HiPencil, HiTrash } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import MetaData from "../../ui/MetaData";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { useUser } from "../authentication/useUser";
import { useDeletePost } from "./useDeletePost";

const RowGrid = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  &:visited {
    color: var(--color-grey-400);
  }
  color: var(--color-grey-600);
`;

const Img = styled.img`
  display: block;
  max-width: 5.2rem;
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
  @media (${(props) => props.theme.media.mobile}) {
    max-width: 4rem;
  }
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  @media (${(props) => props.theme.media.mobile}) {
    & span {
      font-size: 1rem;
    }
  }
`;
const Sided = styled.div`
  display: flex;
  gap: 0.8rem;

  @media (${(props) => props.theme.media.mobile}) {
    & span {
      font-size: 0.8rem;
    }
  }
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-700);
  margin: 0;
  @media (${(props) => props.theme.media.mobile}) {
    font-size: 1.2rem;
  }
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
  const isWriter = currentUser?.id === userId;
  const typeLabel = POST_TYPE_OPTIONS.find(
    (option) => option.value === type
  )?.label;
  // const avatar = user?.user_metadata?.avatar || "/default-user.jpg";
  return (
    <Table.Row type="posts">
      <StyledLink to={`/posts/${postId}`}>
        <RowGrid>
          <Stacked>
            <Sided>
              <Tag round="square" type={statusToTagName[type]}>
                <FormattedMessage
                  id={`post.type.${type}`}
                  defaultMessage={typeLabel}
                />
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

      {(isWriter || currentUser?.isMaster) && (
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
            <Modal.Window name="delete">
              <ConfirmDelete
                resource={<FormattedMessage id="menu.posts" />}
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
