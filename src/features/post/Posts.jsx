import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Heading from "../../ui/Heading";
import MainHeading from "../../ui/MainHeading";
import PostTable from "./PostTable";

function Posts() {
  const navigate = useNavigate();
  return (
    <>
      <MainHeading right="moveBack">
        <Heading as="h1">
          <FormattedMessage id="post.head" />
        </Heading>
      </MainHeading>

      <PostTable></PostTable>

      <ButtonGroup>
        <Button onClick={() => navigate("/post/add")}>
          <span>
            <FormattedMessage id="button.addPost" />
          </span>
        </Button>
      </ButtonGroup>
    </>
  );
}
export default Posts;
