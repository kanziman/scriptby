import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 42rem; */
  min-width: 42rem;
  /* padding: 1.2rem; */
  background-color: var(--color-grey-100);
  border-radius: 0.9rem;
  position: relative;
  align-items: stretch;
  align-self: flex-start;

  @media (max-width: 50em) {
    min-width: 20rem;
  }
  @media (max-width: 34em) {
    min-width: 10rem;
  }
`;

export default Box;
