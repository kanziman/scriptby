import { useState } from "react";

import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRowV1";
import Input from "../../ui/Input";
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
      <FormRow
        label={
          <FormattedMessage
            id="form.emailAddress"
            defaultMessage="Email address"
          />
        }
      >
        <Input value={email} disabled />
      </FormRow>

      <FormRow
        label={
          <FormattedMessage id="form.fullName" defaultMessage="Full name" />
        }
      >
        <Input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          id="username"
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow
        label={
          <FormattedMessage
            id="form.avatarImage"
            defaultMessage="Avatar image"
          />
        }
        noFlex
      >
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow hasButton>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          <FormattedMessage id="button.cancel" defaultMessage="Cancel" />
        </Button>
        <Button variation="tertiary" disabled={isUpdating}>
          <FormattedMessage
            id="button.updateAccount"
            defaultMessage="Update account"
          />
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
