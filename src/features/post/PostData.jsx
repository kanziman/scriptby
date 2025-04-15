import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import MetaData from "../../ui/MetaData";
import Modal from "../../ui/Modal";
import Tag from "../../ui/Tag";
import { POST_TYPE_OPTIONS, statusToTagName } from "../../utils/constants";
import { useUser } from "../authentication/useUser";
import { useDeletePost } from "./useDeletePost";

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2.4rem;
  color: var(--color-grey-600);
  @media (${(props) => props.theme.media.tablet}) {
    font-size: 2rem;
  }
`;

const MetaInfo = styled.div`
  color: var(--color-grey-600);
  font-size: 1.4rem;
  margin-bottom: 1.4rem;
  padding-bottom: 1.4rem;
  border-bottom: 1px solid var(--color-grey-200);
  @media (${(props) => props.theme.media.tablet}) {
    font-size: 1.2rem;
  }
`;

const CategoryWrapper = styled.div`
  margin-bottom: 0.4rem;
`;

const UserInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  flex-wrap: wrap;
  /* justify-content: space-between; */
`;

const Avatar = styled.img`
  width: 2.4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 1px solid var(--color-grey-100);
`;

const WriterGroupButton = styled.div`
  display: flex;
  margin-left: auto;
  gap: 1rem;
`;

// 포스트 상세 페이지 컴포넌트
function PostData({ post }) {
  const navigate = useNavigate();
  const { deletePost, isDeleting } = useDeletePost();
  const { user: currentUser } = useUser();
  const {
    created_at: createdAt,
    title,
    category,
    view,
    profile: { username, avatar_url: avatar },
  } = post;
  const postId = post?.id;
  const isWriter = currentUser?.id === post?.user_id;
  const canUpdateDelete = isWriter || currentUser?.isMaster;
  const avatarImg = avatar || "/default-user.jpg";
  const typeLabel = POST_TYPE_OPTIONS.find(
    (option) => option.value === category
  )?.label;
  const handleDelete = function (id) {
    deletePost(id);
    navigate(`/posts`);
  };

  console.log("avatarImg :>> ", avatarImg);
  return (
    <>
      <Title>{title}</Title>
      <MetaInfo>
        <CategoryWrapper>
          <Tag round="square" type={statusToTagName[category]}>
            <FormattedMessage
              id={`post.type.${category}`}
              defaultMessage={typeLabel}
            />
          </Tag>
        </CategoryWrapper>

        <UserInfoRow>
          <MetaData username={username} createdAt={createdAt} view={view}>
            <Avatar
              src={avatarImg}
              alt={`Avatar of ${username}`}
              onError={(e) => {
                e.currentTarget.src = "/default-user.jpg";
              }}
            />
          </MetaData>

          {canUpdateDelete && (
            <WriterGroupButton>
              <Modal>
                <Button
                  size="small"
                  onClick={() => navigate(`/posts/edit/${postId}`)}
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
                    disabled={isDeleting}
                    resource={<FormattedMessage id="menu.posts" />}
                    onConfirm={() => handleDelete(postId)}
                  />
                </Modal.Window>
                <Modal.Window name="edit">
                  {/* 여기에 편집 관련 컴포넌트 */}
                </Modal.Window>
              </Modal>
            </WriterGroupButton>
          )}
        </UserInfoRow>
      </MetaInfo>
    </>
  );
}

export default PostData;
