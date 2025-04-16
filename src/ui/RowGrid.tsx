import styled, { css } from "styled-components";

interface RowGridProps {
  col?: number;
}

const RowGrid = styled.div<RowGridProps>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 5rem;

  ${(props) =>
    props.col &&
    css`
      grid-template-columns: repeat(${props.col}, 1fr);
    `}
`;

export default RowGrid;
