import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { TMDB_BASE_URL, TMDB_KEY, TMDB_SEARCH_URL } from "../utils/constants";
import { getLangCode } from "../utils/helpers";

export function useFetch(state, dispatch) {
  const [loadingState, setLoadingState] = useState({
    isShowsLoading: false,
    isSeasonsLoading: false,
    isEpisodesLoading: false,
  });
  const [error, setError] = useState("");
  const location = useLocation();

  // state에서 query와 filter 가져오기
  const { query, filter, status } = state;
  const prevValues = useRef({ query, filter, status });

  // query 또는 filter가 변경되었을 때만 액션 디스패치하는 useEffect
  useEffect(() => {
    // 중요: query/update를 발생시키지 않음
    if (
      state.status === "shows/fetched" || // 이미 데이터를 가져온 상태
      state.status.includes("trend/") || // 다른 trend 관련 상태
      state.status.includes("seasons/") || // 시즌 관련 상태
      state.status.includes("episodes/") // 에피소드 관련 상태
    ) {
      // console.log("Skipping query update due to special state:", state.status);
      prevValues.current = { query, filter, status: state.status };
      return;
    }

    // console.log("Checking for query/filter changes in regular flow");

    // location.search에 "from"이 포함되면 업데이트를 막음
    if (location.search.includes("from")) return;

    const queryChanged = prevValues.current.query !== query;
    const filterChanged = prevValues.current.filter !== filter;
    const statusChanged = prevValues.current.status !== status;

    // 상태가 변경되었을 때는 업데이트 건너뛰기
    if (statusChanged && status !== "ready") {
      prevValues.current = { query, filter, status };
      return;
    }

    if (queryChanged || filterChanged) {
      // 쿼리가 비어있거나 2글자 이상일 때만 업데이트
      if (query?.trim() === "" || query?.trim().length >= 2) {
        // console.log("Dispatching query/update with:", { query, filter });
        dispatch({
          type: "query/update",
          payload: { query, filter },
        });
      }
      prevValues.current = { query, filter, status };
    }
  }, [query, filter, status, dispatch, location.search]);

  // URL 구성 로직
  const fetchUrl = useMemo(() => {
    const langCode = getLangCode(query || "");

    // 트렌드 쇼의 상세 정보 URL (우선 순위 높게)
    if (state.status === "trend/selected" && state.showId) {
      const currentFilter = state.filter || filter;
      const currentLang = state.lang || langCode;

      // console.log("Building trend URL with:", {
      //   showId: state.showId,
      //   filter: currentFilter,
      //   lang: currentLang,
      // });

      return `${TMDB_BASE_URL}/${currentFilter}/${state.showId}?api_key=${TMDB_KEY}&language=${currentLang}&append_to_response=seasons`;
    }

    // 일반 검색 URL (검색어의 langCode)
    if (query?.length >= 2 && state.status === "ready") {
      return `${TMDB_SEARCH_URL}/${filter}?api_key=${TMDB_KEY}&query=${encodeURIComponent(
        query
      )}&language=${langCode}`;
    }

    // 선택한 쇼의 상세 정보 URL
    if (state.status === "shows/selected" && state.showId) {
      return `${TMDB_BASE_URL}/${filter}/${state.showId}?api_key=${TMDB_KEY}&language=${langCode}&append_to_response=seasons`;
    }

    // 선택한 시즌의 에피소드 정보 URL
    if (
      state.status === "seasons/selected" &&
      state.showId &&
      state.seasonNumber !== null
    ) {
      return `${TMDB_BASE_URL}/${filter}/${state.showId}/season/${state.seasonNumber}?api_key=${TMDB_KEY}&language=${langCode}`;
    }

    return "";
  }, [
    query,
    filter,
    state.status,
    state.showId,
    state.seasonNumber,
    state.filter,
    state.lang,
  ]);

  // 데이터 가져오기 로직
  useEffect(() => {
    if (!fetchUrl) return;

    // console.log("fetchUrl changed:", fetchUrl);
    // console.log("State status:", state.status);

    const controller = new AbortController();

    async function fetchData() {
      try {
        setError("");

        // 로딩 상태 설정
        if (state.status === "ready" && query?.length >= 2) {
          setLoadingState((prev) => ({ ...prev, isShowsLoading: true }));
        } else if (
          state.status === "shows/selected" ||
          state.status === "trend/selected"
        ) {
          setLoadingState((prev) => ({ ...prev, isSeasonsLoading: true }));
        } else if (state.status === "seasons/selected") {
          setLoadingState((prev) => ({ ...prev, isEpisodesLoading: true }));
        } else {
          // 상태가 명확하지 않은 경우
          return;
        }

        // 데이터 가져오기
        // console.log("Fetching from:", fetchUrl);
        const res = await fetch(fetchUrl, { signal: controller.signal });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));

          throw new Error(
            `API Error: ${
              errorData.status_message || res.statusText || "Unknown error"
            }`
          );
        }

        const data = await res.json();
        // console.log("Fetched data:", data);

        // 검색 결과가 없는 경우 처리
        if (
          state.status === "ready" &&
          (!data.results || data.results.length === 0)
        ) {
          setError("");
          return;
        }

        // 트렌드 상태에서 데이터를 가져온 경우, "trend/selected" 대신 "shows/fetched"로 바로 전달
        if (state.status === "trend/selected") {
          // console.log("Dispatching trend data directly to shows/fetched");
          dispatch({
            type: "shows/selected", // trend/selected 대신 shows/selected 액션 타입 사용
            payload: data,
          });
        } else {
          // 일반적인 경우
          dispatch({
            type: state.status,
            payload: data,
          });
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error.message);
          setError("");
        }
      } finally {
        setLoadingState({
          isShowsLoading: false,
          isSeasonsLoading: false,
          isEpisodesLoading: false,
        });
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [fetchUrl, state.status, dispatch, query]);

  return {
    loading: loadingState,
    error,
  };
}
