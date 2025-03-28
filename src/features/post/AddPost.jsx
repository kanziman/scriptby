import { Heading } from "@chakra-ui/react";
import MainHeading from "../../ui/MainHeading";
import AddPostForm from "./AddPostForm";

function AddPost() {
  return (
    <>
      <MainHeading right="moveBack">
        <Heading as="h1">{`글쓰기`}</Heading>
      </MainHeading>
      <AddPostForm />
    </>
  );
}

export default AddPost;
