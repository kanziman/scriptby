import { FaExpand } from "react-icons/fa";
import {
  PiSquareSplitHorizontalFill,
  PiSquareSplitHorizontalLight,
  PiTranslate,
  PiTranslateFill,
} from "react-icons/pi";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { useSidebar } from "../../context/SidebarContext";
import ButtonIcon from "../../ui/ButtonIcon";
import FilterGroup from "../../ui/FilterGroup";
import SidebarToggleButton from "../../ui/SidebarToggleButton";
import TableOperations from "../../ui/TableOperations";

const StyledScreenMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
  justify-content: ${(props) =>
    props.type === "end" ? "flex-end" : "flex-start"};

  align-items: center;
  & button:focus {
    outline: none;
  }
  div {
    display: flex;
  }
  @media (max-width: 34em) {
    & svg {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
`;

function ScreenMenu({
  isToggled,
  onToggle,
  onExpand,
  onHide,
  hideTranslation,
}) {
  const intl = useIntl();
  const options = [
    {
      value: "lines",
      label: intl.formatMessage({
        id: "filter.lines",
        defaultMessage: "LINES",
      }),
    },
    {
      value: "words",
      label: intl.formatMessage({
        id: "filter.words",
        defaultMessage: "WORDS",
      }),
    },
    {
      value: "phrases",
      label: intl.formatMessage({
        id: "filter.phrase",
        defaultMessage: "PHRASE",
      }),
    },
    {
      value: "idioms",
      label: intl.formatMessage({
        id: "filter.idioms",
        defaultMessage: "IDIOMS",
      }),
    },
  ];
  const { sidebarToggled, toggleSidebar } = useSidebar();

  return (
    <>
      <StyledScreenMenu type="start">
        <SidebarToggleButton
          sidebarToggled={sidebarToggled}
          onToggle={toggleSidebar}
        />

        <TableOperations>
          <FilterGroup size="small" filterField="dataType" options={options} />
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
