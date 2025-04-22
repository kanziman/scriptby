import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { getScriptDataById } from "../../services/apiScripts";
import { PAGE_SIZE } from "../../utils/constants";
import { cleansingData, sliceDataLeftRight } from "../../utils/helpers";

// export function useScriptOne({ scriptId, isToggled }) {
export function useScriptOne({ scriptId, isToggled, activeTabValue } = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // console.log("how many times...");

  // FILTER
  const filterValue = searchParams.get("dataType");
  const filter = { field: "dataType", value: filterValue || "lines" };

  useEffect(() => {
    if (filter.value !== "lines" && searchParams.get("page") !== "1") {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", "1");
      setSearchParams(newParams, { replace: true });
    }
  }, [filter.value]);
  // TAB
  // console.log("activeTabValue:", activeTabValue);

  const {
    isPending,
    data: script,
    error,
  } = useQuery({
    queryKey: ["script", scriptId],
    queryFn: () => getScriptDataById(scriptId),
    // queryFn: () => getScriptById(scriptId),
    onError: (err) => toast.error(err.message),
  });

  if (isPending || !script) {
    return { isPending, error, script: [], count: 0, subData: null };
  }

  const {
    name: episodeName,
    // tv: {
    //   name: showName,
    //   id: tvId,
    //   title: movieTitle,
    //   backdrop_path: backdropPath,
    // },
    episode_number: episodeNumber,
    season_number: seasonNumber,
    translated_language: translatedLanguage,
    file_name: fileName,
    created_at: createdAt,
    profile,
    // show_category: showCategory,
  } = script;

  const lines = script["lines"] || [];
  const pageSize = isToggled ? 2 * PAGE_SIZE : PAGE_SIZE;
  const start = (page - 1) * pageSize;

  let dataToRender;
  let count;

  if (filter.value === "lines") {
    const slicedLines = lines.slice(start, start + pageSize);
    dataToRender = isToggled ? sliceDataLeftRight(slicedLines) : slicedLines;
    count = lines.length;
  } else {
    // === 모든 필터 (words, phrases, idioms)에서 ★와 괄호 제거 ===
    const cleanSubData = (script[filter.value] || []).map((item) => ({
      ...item,
      cleanedOriginal: item.original
        .replace(/（[^）]*）/g, "") // 일본어 괄호 제거
        .replace(/\([^)]*\)/g, "") // 일반 괄호 제거
        .replace("★", "")
        .trim(),
    }));

    // === 단순 includes로 매칭 ===
    const filteredLines = lines.filter((line) =>
      cleanSubData.some((item) => line.original.includes(item.cleanedOriginal))
    );

    const slicedFilteredLines = filteredLines.slice(start, start + pageSize);
    dataToRender = isToggled
      ? sliceDataLeftRight(slicedFilteredLines)
      : slicedFilteredLines;

    count = filteredLines.length;
  }

  // const subData = filter.value === "lines" ? null : script[filter.value];
  const subData = filter.value === "lines" ? [] : script[filter.value] || [];
  const tabData = script[activeTabValue];

  return {
    isPending,
    error,
    // showName,
    count,
    script: dataToRender,
    subData,
    tabData,
    episodeName,
    episodeNumber,
    seasonNumber,
    translatedLanguage,
    fileName,
    createdAt,
    profile,
    // tvId,
    // showCategory,
    // movieTitle,
    show: cleansingData(script?.tv),
  };
}
