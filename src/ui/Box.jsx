import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  /* width: 42rem; */
  min-width: 42rem;
  /* padding: 1.2rem; */
  background-color: var(--color-grey-100);
  border-radius: 0.9rem;
  position: relative;
  align-items: stretch;
  align-self: flex-start;

  @media (max-width: 80rem) {
    min-width: 20rem;
  }
`;

export default Box;
