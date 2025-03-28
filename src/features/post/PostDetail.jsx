import { useParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import MainHeading from "../../ui/MainHeading";
import Spinner from "../../ui/Spinner";
import EditPost from "./EditPost";
import PostDataBox from "./PostDataBox";
import { usePost } from "./usePost";

// Import CSS
import "reactjs-tiptap-editor/style.css";

function PostDetail() {
  const { post, isPending } = usePost();
  const { action } = useParams();

  if (isPending) return <Spinner />;
  if (!post) return <Empty resourceName="no show" />;

  return (
    <>
      <MainHeading right="moveBack" link={"/post"}>
        <Heading as="h1">{`전체글`}</Heading>
      </MainHeading>
      {action === "edit" ? <EditPost /> : <PostDataBox />}
    </>
  );
}

export default PostDetail;
