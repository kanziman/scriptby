import styled from "styled-components";
const HeadingGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  @media (${(props) => props.theme.media.mobile}) {
    padding: 0 1rem;
    gap: 1.2rem;
    & h2 {
      font-size: 1.6rem;
    }
    & span {
      font-size: 1rem;
    }
  }
`;

export default HeadingGroup;
