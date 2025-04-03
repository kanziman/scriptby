import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";

import { FormattedMessage } from "react-intl";
import FormRow from "../../ui/FormRowV1";
import { useUpdateUser } from "./useUpdateUser";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label={
          <FormattedMessage
            id="form.password"
            defaultMessage="Password (min 8 characters)"
          />
        }
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label={
          <FormattedMessage
            id="form.passwordConfirm"
            defaultMessage="Confirm password"
          />
        }
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow hasButton>
        <Button onClick={reset} type="reset" variation="secondary">
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

export default UpdatePasswordForm;
