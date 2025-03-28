import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { cleansingData } from "../utils/helpers";
import { useFetch } from "./useFetch";
const QueryContext = createContext();
// reducer.js
const initState = {
  status: "ready",
  shows: [],
  showId: null,
  seasons: [],
  episodes: [],
  selectedShow: null,
  seasonNumber: null,
  seasonIndex: null,
  lang: null,
};

function reducer(state, action) {
  console.log("reducer:", state, action);

  switch (action.type) {
    case "ready":
      return {
        ...state,
        shows: action.payload?.results,
        status: "searched",
      };
    case "query/update":
      return {
        ...initState,
        status: "ready",
      };

    case "shows/back":
      return {
        ...state,
        showId: null,
        selectedShow: null,
        seasons: [],
        episodes: [],
        seasonNumber: null,
        seasonIndex: null,
        status: "searched",
      };
    // CLICKED
    case "shows/clicked":
      return {
        ...state,
        showId: action.payload,
        status: "shows/selected",
      };
    // FETCTED
    case "shows/selected":
      return {
        ...state,
        selectedShow: action.payload,
        status: "shows/fetched",
      };
    // CLICKED
    case "trend/tv/clicked":
      return {
        ...state,
        showId: action.payload,
        status: "trend/selected",
        category: "tv",
        lang: "en",
      };
    case "trend/movie/clicked":
      return {
        ...state,
        showId: action.payload,
        status: "trend/selected",
        category: "movie",
        lang: "en",
      };
    // FETCHED
    case "trend/selected":
      return {
        ...state,
        selectedShow: action.payload,
        status: "shows/fetched",
      };

    // CLICK EVENT
    case "seasons/clicked": {
      const [seasonNumber, seasonIndex] = action.payload;
      return {
        ...state,
        seasonNumber,
        seasonIndex, // 새로 추가된 필드
        status: "seasons/selected",
      };
    }

    // AFTER FETCHED
    case "seasons/selected":
      return {
        ...state,
        episodes: action.payload?.episodes,
        status: "seasons/fetched",
      };

    // CLICK EVENT
    case "episodes/clicked":
      return {
        ...state,
        selectedEpisode: action.payload,
        status: "episodes/selected",
      };
    // 추가: 스크립트 정보가 병합된 episodes로 업데이트
    case "episodes/update":
      return {
        ...state,
        episodes: action.payload,
      };
    default:
      throw new Error("Action unknown");
  }
}

function QueryProvider({ children }) {
  // const [query, setQuery] = useState("");
  const storedState = localStorage.getItem("queryState");
  const initialState = storedState ? JSON.parse(storedState) : initState;

  const [query, setQuery] = useState(localStorage.getItem("query") || "");
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, error } = useFetch(state, dispatch, query);

  useEffect(() => {
    console.log("new state:", state);
    localStorage.setItem("queryState", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    localStorage.setItem("query", query);
  }, [query]);

  return (
    <QueryContext.Provider
      value={{
        state,
        searchedShows: state.shows,
        selectedShow: state.selectedShow,
        selectedEpisode: state.selectedEpisode,
        cleanedShow: cleansingData(state.selectedShow),
        episodes: state.episodes,
        query,
        setQuery,
        loading,
        error,

        dispatch,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
}

function useQuery() {
  const context = useContext(QueryContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}

export { QueryProvider, useQuery };
