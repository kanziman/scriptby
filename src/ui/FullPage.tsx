import { ReactNode } from "react";
import styled from "styled-components";

const StyledFullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

type FullPageProps = {
  children: ReactNode,
};

function FullPage({ children }: FullPageProps) {
  return <StyledFullPage>{children}</StyledFullPage>;
}

export default FullPage;
