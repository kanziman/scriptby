// import { useState } from "react";
// import styled from "styled-components";
// import ScreenMenu from "./ScreenMenu";
// import ScreenTable from "./ScreenTable";
// const StyledScreenContainer = styled.div`
//   width: ${(props) => (props.isExpanded ? "100vw" : "auto")};
//   height: ${(props) => (props.isExpanded ? "100vh" : "auto")};
//   position: ${(props) => (props.isExpanded ? "fixed" : "relative")};
//   top: 0;
//   left: 0;
//   background: ${(props) => (props.isExpanded ? "white" : "transparent")};
//   z-index: ${(props) => (props.isExpanded ? "1000" : "auto")};
//   overflow: auto;
// `;

// function EditScreen() {
//   const [isToggled, setIsToggled] = useState(true);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [hideTranslation, setHideTranslation] = useState(false);

//   const handleToggle = () => setIsToggled((prev) => !prev);
//   const handleExpand = () => setIsExpanded((prev) => !prev);
//   const handleHideTranslation = () => setHideTranslation((prev) => !prev);

//   return (
//     <StyledScreenContainer isExpanded={isExpanded}>
//       EDIT
//       <ScreenTable isToggled={isToggled} hideTranslation={hideTranslation}>
//         <ScreenMenu
//           isToggled={isToggled}
//           onToggle={handleToggle}
//           onExpand={handleExpand}
//           isExpanded={isExpanded}
//           onHide={handleHideTranslation}
//           hideTranslation={hideTranslation}
//         />
//       </ScreenTable>
//     </StyledScreenContainer>
//   );
// }
// export default EditScreen;
