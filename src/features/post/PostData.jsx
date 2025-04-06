import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Tag from "../../ui/Tag";
import { POST_TYPE_OPTIONS, statusToTagName } from "../../utils/constants";
import { customTimeFormat } from "../../utils/helpers";
import { useUser } from "../authentication/useUser";
import { useDeletePost } from "./useDeletePost";

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: var(--color-grey-600);
  @media (max-width: 50em) {
    font-size: 2rem;
  }
`;

const MetaInfo = styled.div`
  color: var(--color-grey-600);
  font-size: 1.4rem;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--color-grey-200);
  @media (max-width: 50em) {
    font-size: 1.2rem;
  }
`;

const CategoryWrapper = styled.div`
  margin-bottom: 2rem;
`;

const UserInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-wrap: wrap;
  /* justify-content: space-between; */
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;
const MetaGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const Avatar = styled.img`
  width: 2.4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 1px solid var(--color-grey-100);
`;

const Username = styled.span`
  font-weight: 500;
`;

const ViewCount = styled.span`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  &::before {
    content: "•";
    margin-right: 2px;
  }
`;

const TimeStamp = styled.time`
  &::before {
    content: "•";
    margin-right: 4px;
  }
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
  const avatarImg = avatar || "/default-user.jpg";
  const typeLabel = POST_TYPE_OPTIONS.find(
    (option) => option.value === category
  )?.label;
  const handleDelete = function (id) {
    deletePost(id);
    navigate(`/posts`);
  };
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
          <MetaGroup>
            <UserInfo>
              <Avatar src={avatarImg} alt={`Avatar of ${username}`} />
              <Username>{username}</Username>
            </UserInfo>
            <TimeStamp dateTime={createdAt}>
              {customTimeFormat(createdAt)}
            </TimeStamp>
            <ViewCount>
              {view} <FormattedMessage id="post.count" />
            </ViewCount>
          </MetaGroup>

          {(isWriter || currentUser?.isMaster) && (
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
