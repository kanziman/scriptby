import styled from "styled-components";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  justify-content: space-between;

  @media (max-width: 50em) {
    button,
    select {
      font-size: 1rem;
    }
  }
  @media (max-width: 34em) {
    button,
    select {
      font-size: 0.8rem;
    }
  }
`;

export default TableOperations;
