import styled from "styled-components";
import { useMoveBack } from "../hooks/useMoveBack";
import ButtonText from "./ButtonText";

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-start;
`;

function ErrorMessage({ message, onCloseShow }) {
  const moveBack = useMoveBack();
  return (
    <>
      <p className="error">
        <span>⛔️</span> {message}
      </p>
      <div>
        <ButtonGroup onClick={onCloseShow}>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </ButtonGroup>
      </div>
    </>
  );
}
export default ErrorMessage;
