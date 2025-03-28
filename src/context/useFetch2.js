import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TMDB_BASE_URL, TMDB_KEY, TMDB_SEARCH_URL } from "../utils/constants";
import { getLangCode } from "../utils/helpers";
import { useLanguage } from "./LanguageProvider";

export function useFetch(state, dispatch, query) {
  const [isShowsLoading, setIsShowsLoading] = useState(false);
  const [isSeasonsLoading, setIsSeasonsLoading] = useState(false);
  const [isEpisodesLoading, setIsEpisodesLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  const { locale } = useLanguage();

  const prevQuery = useRef(query);

  const filterValue = searchParams.get("filter");
  const filter = filterValue ?? "movie";
  const prevType = useRef(filter);

  useEffect(() => {
    console.log("object :>> ", location.search);
    if (location.search.includes("from")) {
      return;
    }
    console.log(
      "prevQuery :>> ",
      prevQuery.current,
      query,
      prevQuery.current !== query
    );
    console.log(
      "prevType :>> ",
      prevType.current,
      filter,
      prevType.current !== filter
    );
    if (prevQuery.current !== query || prevType.current !== filter) {
      if (query?.trim() === "" || query?.length >= 2) {
        dispatch({ type: "query/update" });
      }
      prevQuery.current = query;
      prevType.current = filter;
    }
  }, [query, filter]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setError("");
        let url = "";

        const langCode = getLangCode(query);
        if (query?.length >= 2 && state.status === "ready") {
          setIsShowsLoading(true);
          url = `${TMDB_SEARCH_URL}/${filter}?api_key=${TMDB_KEY}&query=${query}&language=${langCode}`;
        } else if (state.status === "shows/selected") {
          setIsSeasonsLoading(true);
          url = `${TMDB_BASE_URL}/${filter}/${state.showId}?api_key=${TMDB_KEY}&language=${langCode}`;
        } else if (state.status === "trend/selected") {
          setIsSeasonsLoading(true);
          url = `${TMDB_BASE_URL}/${state.category}/${state.showId}?api_key=${TMDB_KEY}&language=${state.lang}`;
        } else if (state.status === "seasons/selected") {
          setIsEpisodesLoading(true);
          url = `${TMDB_BASE_URL}/${filter}/${state.showId}/season/${state.seasonNumber}?api_key=${TMDB_KEY}&language=${langCode}`;
        } else {
          console.log("Not fetched");
          setError("");
          return;
        }
        console.log("FETCH url :>> ", state.status, url);

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("Something went wrong with fetching data");

        const data = await res.json();
        if (!data) throw new Error("No results found");
        console.log("New Fetched Data:", data);

        dispatch({
          type: state.status,
          payload: data,
        });

        setError("");
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsShowsLoading(false);
        setIsSeasonsLoading(false);
        setIsEpisodesLoading(false);
      }
    }

    fetchData();

    return function () {
      controller.abort();
    };
  }, [state.status]);

  return {
    loading: {
      isShowsLoading,
      isSeasonsLoading,
      isEpisodesLoading,
    },
    error,
  };
}
