// // reducer.js
// export const initState = {
//   status: "ready",
//   shows: [],
//   showId: null,
//   seasons: [],
//   episodes: [],
//   selectedShow: null,
//   seasonNumber: null,
//   seasonIndex: null,
// };

// export function reducer(state, action) {
//   console.log("reducer:", state, action);

//   switch (action.type) {
//     case "ready":
//       return {
//         ...state,
//         shows: action.payload?.results,
//         status: "searched",
//       };
//     case "query/update":
//       return {
//         ...initState,
//         status: "ready",
//       };

//     case "shows/back":
//       return {
//         ...state,
//         showId: null,
//         selectedShow: null,
//         seasons: [],
//         episodes: [],
//         seasonNumber: null,
//         seasonIndex: null,
//         status: "searched",
//       };
//     // CLICK EVENT
//     case "shows/select":
//       return {
//         ...state,
//         showId: action.payload,
//         status: "shows/selected",
//       };

//     // AFTER FETCTED
//     case "shows/selected":
//       return {
//         ...state,
//         selectedShow: action.payload,
//         status: "shows/fetched",
//       };

//     // CLICK EVENT
//     case "seasons/select": {
//       const [seasonNumber, seasonIndex] = action.payload;
//       return {
//         ...state,
//         seasonNumber,
//         seasonIndex, // 새로 추가된 필드
//         status: "seasons/selected",
//       };
//     }

//     // AFTER FETCHED
//     case "seasons/selected":
//       return {
//         ...state,
//         episodes: action.payload?.episodes,
//         status: "seasons/fetched",
//       };

//     default:
//       throw new Error("Action unknown");
//   }
// }
