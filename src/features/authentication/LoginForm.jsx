import { useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import SocialButton from "../../ui/SocialButton";
import SpinnerMini from "../../ui/SpinnerMini";
import GoogleLogin from "./GoogleLogin";
import { useLogin } from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending } = useLogin();
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormRowVertical
          label={formatMessage({
            id: "login.email",
            defaultMessage: "Email address",
          })}
        >
          <Input
            type="email"
            id="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
          />
        </FormRowVertical>
        <FormRowVertical
          label={formatMessage({
            id: "login.password",
            defaultMessage: "Password",
          })}
        >
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button size="large" disabled={isPending}>
            {!isPending ? (
              formatMessage({
                id: "login.loginButton",
                defaultMessage: "Log in",
              })
            ) : (
              <SpinnerMini />
            )}
          </Button>
        </FormRowVertical>

        {/* Divider line with social login text */}
        <FormRowVertical>
          <SocialButton />
        </FormRowVertical>

        {/* <FormRowVertical>
          {!isPending ? <NaverLogin /> : <SpinnerMini />}
        </FormRowVertical> */}
        <FormRowVertical>
          {!isPending ? <GoogleLogin /> : <SpinnerMini />}
        </FormRowVertical>
      </Form>

      <FormRow>
        <Button variation="secondary" onClick={() => navigate("/signup")}>
          {formatMessage({
            id: "login.noAccount",
            defaultMessage: "No Account? Sign Up",
          })}
        </Button>
      </FormRow>
    </>
  );
}

export default LoginForm;
