import styled, { css } from "styled-components";

// 🔹 지원 가능한 타입, 라운드 타입 정의
type TagType = "primary" | "secondary" | "success" | "danger" | "warning";
type TagShape = "pill" | "square";

interface TagProps {
  type: TagType;
  round?: TagShape;
}

const Tag = styled.span<TagProps>`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  align-self: center;
  word-break: keep-all;

  ${({ type, round = "pill" }) => css`
    color: var(--color-${type}-700);
    background-color: var(--color-${type}-100);
    border-radius: ${round === "square" ? "5px" : "100px"};
  `}
`;

export default Tag;
