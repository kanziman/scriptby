import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: flex-start;
      align-items: center;
      gap: ${props.gap ? props.gap : "2rem"};
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: ${props.gap ? props.gap : "1.6rem"};
    `}

  ${(props) =>
    props.type === "vertical-gap" &&
    css`
      gap: ${props.gap ? props.gap : "2.4rem"};
      background-color: var(--color-grey-50);
      align-items: flex-start;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
