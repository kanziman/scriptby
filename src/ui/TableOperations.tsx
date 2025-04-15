import styled from "styled-components";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  justify-content: space-between;

  @media (${(props) => props.theme.media.tablet}) {
    button,
    select {
      font-size: 1rem;
    }
  }

  @media (${(props) => props.theme.media.mobile}) {
    button,
    select {
      font-size: 0.8rem;
    }
  }
`;

export default TableOperations;
