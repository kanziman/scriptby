import { useIntl } from "react-intl";
import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";
import MainHeading from "../ui/MainHeading";

const LoginLayout = styled.main`
  /* min-height: 50vh; */
  display: grid;
  /* grid-template-columns: 48rem; */
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  const { formatMessage } = useIntl();

  return (
    <LoginLayout>
      <Logo size="large" />

      <MainHeading right="moveBack">
        <Heading as="h4">
          {formatMessage({
            id: "login.header",
            defaultMessage: "Log in to your account",
          })}
        </Heading>
      </MainHeading>

      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
