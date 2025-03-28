import styled from "styled-components";

const LoadMoreButton = styled.button`
  margin-top: 1rem;
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;
  background-color: var(--color-brand-500);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--color-brand-700);
  }
`;
export default LoadMoreButton;
