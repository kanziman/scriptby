import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useEffect } from "react";
import { useUpdateUser } from "./useUpdateUser";
import { useUser } from "./useUser";

function UpdateUserDataForm() {
  const { updateUser, isUpdating } = useUpdateUser();

  const { user } = useUser();
  const id = user?.id;
  const email = user?.email ?? "";
  const currentUserName = user?.username ?? "";
  const [username, setUserName] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (currentUserName) {
      setUserName(currentUserName);
    }
  }, [currentUserName]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    updateUser(
      { id, username, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setUserName(currentUserName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          id="username"
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Avatar image" noFlex>
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button variation="tertiary" disabled={isUpdating}>
          Update account
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
