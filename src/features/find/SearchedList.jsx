// import styled from "styled-components";
// import { SearchedItem } from "./SearchedItem";

// const StyledSearchedList = styled.ul`
//   cursor: pointer;
//   transition: all 0.3s;
//   overflow: scroll;
//   overflow-x: hidden;
//   /* Removing scrollbars for webkit, firefox, and ms, respectively */
//   &::-webkit-scrollbar {
//     width: 0 !important;
//   }
//   scrollbar-width: none;
//   -ms-overflow-style: none;
//   flex: 1;
//   max-width: 50%;
// `;

// export function SearchedList({
//   dispatch,
//   show: selectedShow,
//   searchedResults,
//   onSelectShow,
// }) {
//   return (
//     <StyledSearchedList>
//       {searchedResults?.map((result) => (
//         <SearchedItem
//           dispatch={dispatch}
//           selectedShow={selectedShow}
//           result={result}
//           key={result.id}
//           onSelectShow={onSelectShow}
//         />
//       ))}
//     </StyledSearchedList>
//   );
// }
