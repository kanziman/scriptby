import { ReactNode } from "react";
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
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-grey-200);
  color: var(--color-grey-600);

  @media (${(props) => props.theme.media.mobile}) {
    h1 {
      font-size: 2.2rem;
    }
    button {
      font-size: 1.4rem;
    }
  }
`;

const HoverHeading = styled(Heading)`
  display: inline-block;
  cursor: pointer;

  &:hover {
    color: var(--color-grey-400);
  }
`;

interface MainHeadingProps {
  right?: "moveBack";
  children: ReactNode;
}

function MainHeading({ right, children }: MainHeadingProps): JSX.Element {
  const moveBack = useMoveBack();

  return (
    <HeadingGroup>
      <>{children}</>

      {right === "moveBack" && (
        <ButtonText onClick={moveBack}>
          &larr; <FormattedMessage id="menu.back" />
        </ButtonText>
      )}
    </HeadingGroup>
  );
}

export default MainHeading;
