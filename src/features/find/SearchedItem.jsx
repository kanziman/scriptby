// import { useSearchParams } from "react-router-dom";
// import styled from "styled-components";
// import { useQuery } from "../../context/QueryContext";
// import { DEFAULT_IMAGE, IMG_PATH } from "../../utils/constants";

// const StyledSearchedItem = styled.li`
//   position: relative;
//   display: grid;
//   grid-template-columns: 8rem 1fr;
//   grid-template-rows: auto auto;
//   column-gap: 2.4rem;
//   font-size: 1.6rem;
//   align-items: center;
//   padding: 1.6rem 3.2rem;
//   border-bottom: 1px solid var(--color-grey-100);
//   &:last-child {
//     border-bottom: none;
//   }
//   img {
//     width: 100%;
//     grid-row: 1 / -1;
//   }
//   :hover {
//     background-color: var(--color-grey-100);
//   }
//   &.active {
//     background-color: var(--color-grey-200);
//   }
// `;

// export function SearchedItem({ dispatch, selectedShow, result, onSelectShow }) {
//   const [searchParams] = useSearchParams();
//   console.log("searchParams :>> ", searchParams.get("filter"));
//   const nowFilter = searchParams.get("filter");
//   const { cleanedShow } = useQuery();
//   const {
//     name,
//     poster,
//     date,
//     vote,
//     originalLanguage,
//     isTv,
//     numberOfSeasons,
//     homepage,
//   } = cleanedShow;

//   return (
//     <StyledSearchedItem
//       className={selectedShow?.id === result.id ? "active" : ""}
//     >
//       <img
//         src={poster ? `${IMG_PATH}${poster}` : DEFAULT_IMAGE}
//         alt={`${name} poster`}
//       />

//       <h3>{name}</h3>
//       <p>
//         <span>{date}</span>
//       </p>
//     </StyledSearchedItem>
//   );
// }
