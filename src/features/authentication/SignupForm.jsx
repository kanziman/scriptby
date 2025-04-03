import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
// import NaverLogin from "./NaverLogin";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isPending } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  function onSubmit({ username, email, password }) {
    signup(
      { username, email, password },
      {
        onSettled: () => navigate("/dashboard"),
      }
    );
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRowVertical
          label={formatMessage({
            id: "signup.yourName",
            defaultMessage: "Your name",
          })}
          error={errors?.username?.message}
        >
          <Input
            type="text"
            id="username"
            disabled={isPending}
            {...register("username", {
              required: formatMessage({
                id: "signup.required",
                defaultMessage: "This field is required",
              }),
            })}
          />
        </FormRowVertical>

        <FormRowVertical
          label={formatMessage({
            id: "signup.email",
            defaultMessage: "Email address",
          })}
          error={errors?.email?.message}
        >
          <Input
            type="email"
            id="email"
            disabled={isPending}
            {...register("email", {
              required: formatMessage({
                id: "signup.required",
                defaultMessage: "This field is required",
              }),
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: formatMessage({
                  id: "signup.invalidEmail",
                  defaultMessage: "Please provide a valid email address",
                }),
              },
            })}
          />
        </FormRowVertical>

        <FormRowVertical
          label={formatMessage({
            id: "signup.password",
            defaultMessage: "Password (min 8 characters)",
          })}
          error={errors?.password?.message}
        >
          <Input
            type="password"
            id="password"
            disabled={isPending}
            {...register("password", {
              required: formatMessage({
                id: "signup.required",
                defaultMessage: "This field is required",
              }),
              minLength: {
                value: 8,
                message: formatMessage({
                  id: "signup.passwordMin",
                  defaultMessage: "Password needs a minimum of 8 characters",
                }),
              },
            })}
          />
        </FormRowVertical>

        <FormRowVertical
          label={formatMessage({
            id: "signup.passwordConfirm",
            defaultMessage: "Repeat password",
          })}
          error={errors?.passwordConfirm?.message}
        >
          <Input
            type="password"
            id="passwordConfirm"
            disabled={isPending}
            {...register("passwordConfirm", {
              required: formatMessage({
                id: "signup.required",
                defaultMessage: "This field is required",
              }),
              validate: (value) =>
                value === getValues().password ||
                formatMessage({
                  id: "signup.passwordMatch",
                  defaultMessage: "Passwords need to match",
                }),
            })}
          />
        </FormRowVertical>

        <FormRow>
          <Button
            variation="secondary"
            type="reset"
            disabled={isPending}
            onClick={reset}
          >
            {formatMessage({ id: "signup.cancel", defaultMessage: "Cancel" })}
          </Button>
          <Button disabled={isPending}>
            {formatMessage({
              id: "signup.create",
              defaultMessage: "Create new user",
            })}
          </Button>
        </FormRow>

        {/* <FormRowVertical>
          <SocialButton />
        </FormRowVertical> */}

        {/* <FormRowVertical>
          {!isPending ? <NaverLogin /> : <SpinnerMini />}
        </FormRowVertical> */}
      </Form>

      {/* To LoginForm */}
      <FormRow>
        <Button variation="secondary" onClick={() => navigate("/login")}>
          {formatMessage({
            id: "signup.alreadyRegistered",
            defaultMessage: "Already registered? Login",
          })}
        </Button>
      </FormRow>
    </>
  );
}

export default SignupForm;
