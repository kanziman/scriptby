import { FaExpand } from "react-icons/fa";
import { HiMinus, HiPlus } from "react-icons/hi2";
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
  @media (max-width: 50em) {
    gap: 0.2rem;
    & svg {
      width: 1.4rem;
      height: 1.4rem;
    }
  }
  @media (max-width: 34em) {
    gap: 0;
    & svg {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;

function ScreenMenu({
  isToggled,
  onToggle,
  onExpand,
  onHide,
  hideTranslation,
  onBigger,
  onSmaller,
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
        id: "filter.phrases",
        defaultMessage: "PHRASES",
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
      {/* LINE WORDS PHRASE IDIOMS */}
      <StyledScreenMenu type="start">
        <SidebarToggleButton
          sidebarToggled={sidebarToggled}
          onToggle={toggleSidebar}
        />

        <TableOperations>
          <FilterGroup size="small" filterField="dataType" options={options} />
        </TableOperations>
      </StyledScreenMenu>
      {/* SPLIT HIDE EXPAND  */}
      <StyledScreenMenu type="end">
        <li>
          <ButtonIcon onClick={onBigger}>
            <HiPlus />
          </ButtonIcon>
        </li>
        <li>
          <ButtonIcon onClick={onSmaller}>
            <HiMinus />
          </ButtonIcon>
        </li>
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
