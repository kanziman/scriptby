import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 42rem;
  background-color: var(--color-grey-100);
  border-radius: 0.9rem;
  position: relative;
  align-items: stretch;
  align-self: flex-start;

  @media (${(props) => props.theme.media.tablet}) {
    min-width: 20rem;
  }
  @media (${(props) => props.theme.media.mobile}) {
    min-width: 10rem;
  }
`;

export default Box;
