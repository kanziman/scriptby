import { Heading } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import MainHeading from "../../ui/MainHeading";
import AddPostForm from "./AddPostForm";

function AddPost() {
  return (
    <>
      <MainHeading right="moveBack">
        <Heading as="h1">
          <FormattedMessage id="button.addPost" />
        </Heading>
      </MainHeading>

      <AddPostForm />
    </>
  );
}

export default AddPost;
