import styled, { css } from "styled-components";

const propToTagColor = {
  notice: "red",
  general: "grey",
  "checked-in": "green",
  "checked-out": "silver",
};
const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  align-self: center;

  ${(props) =>
    props.round === "square" &&
    css`
      border-radius: 5px;
    `}

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
`;

export default Tag;
