import DOMPurify from "dompurify"; // HTML 보안을 위한 라이브러리
import styled from "styled-components";
import { customTimeFormat } from "../../utils/helpers";

const DetailContainer = styled.div`
  /* max-width: 800px; */
  margin: 0 auto;
  padding: 4rem;
`;

const PostHeader = styled.div`
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #333;
`;

const MetaInfo = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
`;

const CategoryWrapper = styled.div`
  margin-bottom: 10px;
`;

const Category = styled.span`
  background-color: #f0f0f0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const UserInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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
const ContentContainer = styled.div`
  .ql-editor {
    padding: 0;
  }
  margin-bottom: 3rem;
`;
// 포스트 상세 페이지 컴포넌트
function PostData({ post, edit }) {
  const {
    created_at: createdAt,
    title,
    content,
    category,
    view,
    profile: { username, avatar_url: avatar },
  } = post;

  // HTML 콘텐츠 안전하게 렌더링하기 (XSS 공격 방지)
  const sanitizedContent = DOMPurify.sanitize(content);
  const avatarImg = avatar || "/default-user.jpg";

  return (
    <DetailContainer>
      <PostHeader>
        <Title>{title}</Title>
        <MetaInfo>
          <CategoryWrapper>
            <Category>{category}</Category>
          </CategoryWrapper>
          <UserInfoRow>
            <UserInfo>
              <Avatar src={avatarImg} alt={`Avatar of ${username}`} />
              <Username>{username}</Username>
            </UserInfo>
            <TimeStamp dateTime={createdAt}>
              {customTimeFormat(createdAt)}
            </TimeStamp>
            <ViewCount>조회 {view}</ViewCount>
          </UserInfoRow>
        </MetaInfo>
      </PostHeader>

      <ContentContainer>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </ContentContainer>
    </DetailContainer>
  );
}

export default PostData;
