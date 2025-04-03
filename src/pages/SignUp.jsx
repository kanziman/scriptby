import { useIntl } from "react-intl";
import styled from "styled-components";
import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";
import MainHeading from "../ui/MainHeading";
const LoginLayout = styled.main`
  /* min-height: 100vh; */
  display: grid;
  grid-template-columns: 35rem;
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

      <MainHeading right="moveBack">
        <Heading as="h4">
          {formatMessage({
            id: "signup.header",
            defaultMessage: "Sign up",
          })}
        </Heading>
      </MainHeading>

      <SignupForm />
    </LoginLayout>
  );
}

export default SignUp;
