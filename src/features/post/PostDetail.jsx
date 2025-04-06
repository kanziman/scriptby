import { useParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import MainHeading from "../../ui/MainHeading";
import Spinner from "../../ui/Spinner";
import EditPost from "./EditPost";
import PostDataBox from "./PostDataBox";
import { usePost } from "./usePost";

// Import CSS
import { FormattedMessage, useIntl } from "react-intl";
import "reactjs-tiptap-editor/style.css";

function PostDetail() {
  const { post, isPending } = usePost();
  const { action } = useParams();

  const intl = useIntl();
  const resourceName = intl.formatMessage({ id: "menu.posts" });

  if (isPending) return <Spinner />;

  if (!post) {
    return <Empty resource={resourceName} />;
  }

  return (
    <>
      <MainHeading right="moveBack">
        <Heading as="h1">
          <FormattedMessage id="post.head" />
        </Heading>
      </MainHeading>

      {action === "edit" ? <EditPost /> : <PostDataBox />}
    </>
  );
}

export default PostDetail;
