import styled from "styled-components";
const HeadingGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  @media (max-width: 34em) {
    & h2 {
      font-size: 1.8rem;
    }
    & span {
      font-size: 1.4rem;
    }
  }
`;

export default HeadingGroup;
