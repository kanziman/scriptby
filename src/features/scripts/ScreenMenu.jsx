import { FaExpand } from "react-icons/fa";
import {
  PiSquareSplitHorizontalFill,
  PiSquareSplitHorizontalLight,
  PiTranslate,
  PiTranslateFill,
} from "react-icons/pi";
import styled from "styled-components";
import ButtonIcon from "../../ui/ButtonIcon";
import FilterGroup from "../../ui/FilterGroup";
import TableOperations from "../../ui/TableOperations";

const StyledScreenMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
  /* justify-content: space-around; */
  justify-content: ${(props) =>
    props.type === "end" ? "flex-end" : "flex-start"};

  align-items: center;
  & button:focus {
    outline: none;
  }
  div {
    display: flex;
  }
`;

function ScreenMenu({
  isToggled,
  onToggle,
  onExpand,
  onHide,
  hideTranslation,
}) {
  return (
    <>
      <StyledScreenMenu type="start">
        <TableOperations>
          <FilterGroup
            filterField="dataType"
            options={[
              { value: "lines", label: "LINES" },
              { value: "words", label: "WORDS" },
              { value: "phrasal_verbs", label: "PHRASE" },
              { value: "idioms", label: "IDIOMS" },
            ]}
          />
        </TableOperations>
      </StyledScreenMenu>
      <StyledScreenMenu type="end">
        <li onClick={onToggle}>
          <ButtonIcon>
            {isToggled ? (
              <PiSquareSplitHorizontalFill />
            ) : (
              <PiSquareSplitHorizontalLight />
            )}
          </ButtonIcon>
        </li>
        <li>
          <ButtonIcon onClick={onHide}>
            {!hideTranslation ? <PiTranslateFill /> : <PiTranslate />}
          </ButtonIcon>
        </li>
        <li>
          <ButtonIcon onClick={onExpand}>
            <FaExpand />
          </ButtonIcon>
        </li>
      </StyledScreenMenu>
    </>
  );
}

export default ScreenMenu;
