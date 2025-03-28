import { useIntl } from "react-intl";
import styled from "styled-components";
import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";
const LoginLayout = styled.main`
  /* min-height: 100vh; */
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function SignUp() {
  const { formatMessage } = useIntl();

  return (
    <LoginLayout>
      <Logo size="large" />
      <Heading as="h4">
        {formatMessage({
          id: "signup.header",
          defaultMessage: "Sign up",
        })}
      </Heading>
      <SignupForm />
    </LoginLayout>
  );
}

export default SignUp;
