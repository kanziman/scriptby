import { HiAcademicCap } from "react-icons/hi2";
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
    min-width: 38rem;
  }
  @media (max-width: 70rem) {
    grid-template-columns: 1fr;
    /* 
      원래 소스 순서:
      1. Update user data
      2. Become a tutor
      3. Update password
      
      미디어 쿼리에서는 tutor가 첫 번째,
      user data가 두 번째, password가 세 번째가 되도록 지정
    */
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
        <Heading as="h1">{`# ACCOUNT`}</Heading>
      </MainHeading>
      <RowGrid>
        <Row>
          <Heading as="h3">Update user data</Heading>
          <UpdateUserDataForm />
        </Row>

        <Row>
          <Heading as="h3">
            <HiAcademicCap />
            Become a tutor
          </Heading>
          <Tutor />
        </Row>

        <Row>
          <Heading as="h3">Update password</Heading>
          <UpdatePasswordForm />
        </Row>
      </RowGrid>
    </>
  );
}

export default Account;
