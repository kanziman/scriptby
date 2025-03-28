import styled from "styled-components";

const StyledArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  cursor: pointer;
  z-index: 1;
  font-size: 1.6rem;
`;

export function ArrowButton({ children, ...props }) {
  return <StyledArrowButton {...props}>{children}</StyledArrowButton>;
}

export default ArrowButton;
