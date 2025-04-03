import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { useMoveBack } from "../hooks/useMoveBack";
import ButtonText from "./ButtonText";
import Heading from "./Heading";
const HeadingGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 6rem;
  gap: 2.4rem;
  align-items: center;
  @media (max-width: 34em) {
    h1 {
      font-size: 2.2rem;
    }
    button {
      font-size: 1.4rem;
    }
  }
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-grey-200);
`;

const HoverHeading = styled(Heading)`
  display: inline-block;
  cursor: pointer;

  &:hover {
    color: var(--color-grey-400);
  }
`;
function MainHeading({ headName, right, link, children }) {
  const moveBack = useMoveBack();

  return (
    <HeadingGroup>
      <span>{children}</span>

      {right === "moveBack" && (
        <ButtonText onClick={moveBack}>
          &larr; {<FormattedMessage id="menu.back" />}
        </ButtonText>
      )}
    </HeadingGroup>
  );
}

export default MainHeading;
