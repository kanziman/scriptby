import styled from "styled-components";

// const StyledClickableRow = styled.span`
//   cursor: pointer;

// `;

const StyledClickableRow = styled.span`
  display: contents;
  cursor: pointer;
`;

function ClickableRow({ children }) {
  return <StyledClickableRow>{children}</StyledClickableRow>;
}

export default ClickableRow;
