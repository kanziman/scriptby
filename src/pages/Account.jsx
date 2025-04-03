import { HiAcademicCap } from "react-icons/hi2";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import MainHeading from "../ui/MainHeading";
import Row from "../ui/Row";
import Tutor from "../ui/Tutor";

const RowGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;

  & > div {
    min-width: 35rem;
  }
  @media (max-width: 50em) {
    grid-template-columns: 1fr;
    & > :nth-child(1) {
      grid-row: 2 / span 1; /* Update user data를 두 번째 행으로 */
    }
    & > :nth-child(2) {
      grid-row: 1 / span 1; /* Become a tutor를 첫 번째 행으로 */
    }
    & > :nth-child(3) {
      grid-row: 3 / span 1; /* Update password를 세 번째 행으로 */
    }
  }
`;

function Account() {
  return (
    <>
      <MainHeading right="moveBack" link={"/post"}>
        <Heading as="h1">
          <FormattedMessage id="menu.account" />
        </Heading>
      </MainHeading>
      {/* MAIN */}
      <RowGrid>
        <Row>
          <Heading as="h3">
            <FormattedMessage
              id="profile.updateUserData"
              defaultMessage="Update user data"
            />
          </Heading>
          <UpdateUserDataForm />
        </Row>

        <Row>
          <Heading as="h3">
            <HiAcademicCap />
            <FormattedMessage
              id="profile.becomeTutor"
              defaultMessage="Become a tutor"
            />
          </Heading>
          <Tutor />
        </Row>

        <Row>
          <Heading as="h3">
            <FormattedMessage
              id="profile.updatePassword"
              defaultMessage="Update password"
            />
          </Heading>
          <UpdatePasswordForm />
        </Row>
      </RowGrid>
    </>
  );
}

export default Account;
