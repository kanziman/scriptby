import styled, { css } from "styled-components";

type RowType = "horizontal" | "vertical";
interface RowProps {
  type?: RowType;
  gap?: string;
}

// 스타일 매핑 객체
const rowStyles = {
  horizontal: (gap?: string) => css`
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    gap: ${gap || "2rem"};
  `,
  vertical: (gap?: string) => css`
    flex-direction: column;
    gap: ${gap || "1.6rem"};
  `,
};

const Row = styled.div<RowProps>`
  display: flex;
  ${({ type, gap }) => rowStyles[type || "vertical"](gap)}
`;

export default Row;
