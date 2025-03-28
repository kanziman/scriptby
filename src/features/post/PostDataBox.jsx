import { format } from "date-fns";
import DOMPurify from "dompurify"; // HTML 보안을 위한 라이브러리
import styled from "styled-components";
import PostData from "./PostData";
import { usePost } from "./usePost";

const StyledPostDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-400);
  text-align: right;
`;

const PostSection = styled.div`
  margin: 0 auto;
  padding: 4rem;
`;
const ContentContainer = styled.div`
  .ql-editor {
    padding: 0;
  }
  margin-bottom: 3rem;
  min-height: 32rem;
  @media (max-width: 50em) {
    font-size: 1.4rem;
  }
`;

function PostDataBox() {
  const { post } = usePost();
  const { created_at: createdAt, content } = post;

  const sanitizedContent = DOMPurify.sanitize(content);
  // const avatarImg = avatar || "/default-user.jpg";

  return (
    <>
      <StyledPostDataBox>
        <PostSection>
          <PostData post={post} />
          <ContentContainer>
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </ContentContainer>
        </PostSection>

        <Footer>
          <p>Posted {format(new Date(createdAt), "yyyy.MM.dd(EE), p")}</p>
        </Footer>
      </StyledPostDataBox>
    </>
  );
}

export default PostDataBox;
