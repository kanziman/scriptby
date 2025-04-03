import React, { createContext, useContext, useEffect, useReducer } from "react";
import { cleansingData } from "../utils/helpers";
import { useSettings } from "./SettingsContext"; // settings context 경로에 맞게 수정
import { useFetch } from "./useFetch";

// 초기 상태
const initState = {
  status: "ready",
  query: "",
  filter: "movie",
  shows: [],
  // showId: null,
  seasons: [],
  episodes: [],
  selectedShow: null,
  seasonNumber: null,
  seasonIndex: null,
  lang: null,
};

function reducer(state, action) {
  console.log("reducer:", { currentState: state, action });

  switch (action.type) {
    // settings의 locale과 동기화하기 위한 액션
    case "update/lang":
      return {
        ...state,
        lang: action.payload,
      };

    case "query/update":
      return {
        ...initState,
        query: action.payload?.query || "",
        filter: action.payload?.filter || "movie",
        status: "ready",
        lang: state.lang,
      };

    case "ready":
      return {
        ...state,
        shows: action.payload?.results || [],
        status: "searched",
      };

    case "shows/back":
      return {
        ...state,
        selectedShow: null,
        seasons: [],
        episodes: [],
        seasonNumber: null,
        seasonIndex: null,
        status: "searched",
      };

    case "shows/clicked":
      return {
        ...state,
        showId: action.payload,
        status: "shows/selected",
      };

    case "shows/selected":
      return {
        ...state,
        selectedShow: action.payload,
        seasons: action.payload?.seasons || [],
        status: "shows/fetched",
      };

    case "trend/tv/clicked":
      return {
        ...initState,
        showId: action.payload?.showId,
        status: "trend/selected",
        query: action.payload?.query || "",
        filter: action.payload?.filter,
        lang: state.lang, // 현재 lang 유지
      };

    case "trend/movie/clicked":
      return {
        ...initState,
        showId: action.payload?.showId,
        status: "trend/selected",
        query: action.payload?.query || "",
        filter: action.payload?.filter,
        lang: state.lang, // 현재 lang 유지
      };

    case "trend/selected":
      return {
        ...state,
        selectedShow: action.payload,
        seasons: action.payload?.seasons || [],
        status: "shows/fetched",
      };

    case "seasons/clicked": {
      const [seasonNumber, seasonIndex] = action.payload;
      return {
        ...state,
        seasonNumber,
        seasonIndex,
        status: "seasons/selected",
      };
    }

    case "seasons/selected":
      return {
        ...state,
        episodes: action.payload?.episodes || [],
        status: "seasons/fetched",
      };

    case "episodes/clicked":
      return {
        ...state,
        selectedEpisode: action.payload?.episode,
        status: "episodes/selected",
      };

    case "episodes/update":
      return {
        ...state,
        episodes: action.payload || [],
      };

    default:
      console.warn("UNKNOWN ACTION TYPE:", action.type);
      return state;
  }
}

const QueryContext = createContext();

function QueryProvider({ children }) {
  // SettingsContext에서 locale 값을 가져옴
  const { locale } = useSettings();

  const storedState = localStorage.getItem("queryState");
  const initialState = storedState
    ? { ...JSON.parse(storedState) }
    : { ...initState, lang: locale };
  console.log("initialState :>> ", initialState); // localStorage에서 상태 복원

  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, error } = useFetch(state, dispatch);

  // settings의 locale이 변경되면 QueryContext의 lang을 업데이트
  useEffect(() => {
    dispatch({ type: "update/lang", payload: locale });
  }, [locale]);

  // 상태 변경 시 localStorage에 저장
  useEffect(() => {
    console.log("State updated:", state);
    localStorage.setItem("queryState", JSON.stringify(state));
  }, [state]);

  return (
    <QueryContext.Provider
      value={{
        state,
        searchedShows: state.shows?.map((e) => cleansingData(e)) || [],
        selectedShow: state.selectedShow,
        selectedEpisode: state.selectedEpisode,
        cleanedShow: state.selectedShow
          ? cleansingData(state.selectedShow)
          : null,
        episodes: state.episodes || [],
        seasons: state.seasons || [],
        query: state.query || "",
        filter: state.filter || "movie",
        dispatch,
        loading,
        error,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
}

function useQuery() {
  const context = useContext(QueryContext);
  if (context === undefined)
    throw new Error("QueryContext was used outside of the QueryProvider");
  return context;
}

export { QueryProvider, useQuery };
