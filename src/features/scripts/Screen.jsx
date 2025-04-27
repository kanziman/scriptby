import { useState } from "react";
import styled from "styled-components";
import ScreenMenu from "./ScreenMenu";
import ScreenTable from "./ScreenTable";

const StyledScreenContainer = styled.div`
  width: ${(props) => (props.isExpanded ? "100vw" : "auto")};
  height: ${(props) => (props.isExpanded ? "100vh" : "auto")};
  position: ${(props) => (props.isExpanded ? "fixed" : "relative")};
  top: 0;
  left: 0;
  background: ${(props) => (props.isExpanded ? "white" : "transparent")};
  z-index: ${(props) => (props.isExpanded ? "1000" : "auto")};
  overflow: auto;
  display: flex;
`;

function Screen() {
  const [isToggled, setIsToggled] = useState(false);
  const [isRomanToggled, setIsRomanToggled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hideTranslation, setHideTranslation] = useState(false);
  const [textScale, setTextScale] = useState(1.0);

  const handleToggle = () => setIsToggled((prev) => !prev);
  const handleExpand = () => setIsExpanded((prev) => !prev);
  const handleHideTranslation = () => setHideTranslation((prev) => !prev);

  const handleBigger = () => setTextScale((prev) => prev + 0.1);
  const handleSmaller = () => setTextScale((prev) => Math.max(0.5, prev - 0.1));

  const handleRomanToggle = () => setIsRomanToggled((prev) => !prev);

  return (
    <StyledScreenContainer isExpanded={isExpanded}>
      <ScreenTable
        isToggled={isToggled}
        hideTranslation={hideTranslation}
        textScale={textScale}
        isRomanToggled={isRomanToggled}
      >
        <ScreenMenu
          isToggled={isToggled}
          onToggle={handleToggle}
          onExpand={handleExpand}
          isExpanded={isExpanded}
          onHide={handleHideTranslation}
          hideTranslation={hideTranslation}
          onBigger={handleBigger}
          onSmaller={handleSmaller}
          isRomanToggled={isRomanToggled}
          onRomanToggle={handleRomanToggle}
        />
      </ScreenTable>

      {/* <ScrollToContainerTop /> */}
    </StyledScreenContainer>
  );
}

export default Screen;
