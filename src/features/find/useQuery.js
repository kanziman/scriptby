// import { useEffect, useState } from "react";
// import {
//   TMDB_BASE_URL,
//   TMDB_KEY,
//   TMDB_SEARCH_URL,
// } from "../../utils/constants";

// export function useQuery(query, show) {
//   const [searchedResults, setSearchedResults] = useState([]);
//   const [showDetail, setShowDetail] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   // const [seasons, setSeasons] = useState([]);
//   const [episodes, setEpisodes] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setIsLoading(true);
//         setError("");

//         let url = "";

//         if (show?.id) {
//           // 선택한 TV 쇼 상세 정보 가져오기
//           url = `${TMDB_BASE_URL}/tv/${show.id}?api_key=${TMDB_KEY}`;
//           if (show.isSeason) {
//             url = `${TMDB_BASE_URL}/tv/${show.id}/season/${show.seasonNumber}?api_key=${TMDB_KEY}`;
//           }
//         } else if (query.length >= 3) {
//           // 검색어 기반으로 TV 쇼 목록 가져오기
//           url = `${TMDB_SEARCH_URL}/tv?api_key=${TMDB_KEY}&query=${query}`;
//         } else {
//           setSearchedResults([]);
//           setError("");
//           return;
//         }
//         console.log("url:", url);
//         console.log("show.isSeason:", show.isSeason);

//         const res = await fetch(url);

//         if (!res.ok) throw new Error("Something went wrong with fetching data");

//         const data = await res.json();
//         if (!data) throw new Error("No results found");

//         console.log("Fetched Data:", data);

//         if (show?.id && !show.isSeason) {
//           setShowDetail(data);
//         } else if (show?.id && show.isSeason) {
//           setEpisodes(data.episodes);
//         } else {
//           setSearchedResults(data.results);
//         }

//         setError("");
//       } catch (error) {
//         console.error(error.message);
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchData();
//   }, [query, show]);

//   return {
//     searchedResults,
//     showDetail,
//     setShowDetail,
//     episodes,
//     setEpisodes,
//     isLoading,
//     error,
//   };
// }
