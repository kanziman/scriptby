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
        <Heading as="h1">{`전체글`}</Heading>
      </MainHeading>

      <PostTable></PostTable>

      <ButtonGroup>
        <Button onClick={() => navigate("/post/add")}>
          <span>새글</span>
        </Button>
      </ButtonGroup>
    </>
  );
}
export default Posts;
