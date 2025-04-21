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
    // ★ 제거 후 원문 정리
    const cleanSubData = (script[filter.value] || []).map((item) => ({
      ...item,
      cleanedOriginal: item.original.replace("★", "").trim(),
    }));

    // lines 중에서 cleanedOriginal이 포함된 것만 필터
    const isPhrases = filter.value === "phrases";
    const filteredLines = lines.filter((line) =>
      cleanSubData.some((item) => {
        if (!isPhrases) {
          return cleanSubData.some((item) =>
            line.original.includes(item.cleanedOriginal)
          );
        }

        // ONLY PHRASES
        const [verb, particle] = item.cleanedOriginal.split(" ");
        if (!verb || !particle) return false;

        const expr = new RegExp(
          `\\b${verb}(ed|s|ing)?(\\s+\\w+)?\\s+${particle}\\b`,
          "i"
        );

        return expr.test(line.original);
      })
    );

    const slicedFilteredLines = filteredLines.slice(start, start + pageSize);
    dataToRender = isToggled
      ? sliceDataLeftRight(slicedFilteredLines)
      : slicedFilteredLines;

    count = filteredLines.length;
  }

  const subData = filter.value === "lines" ? null : script[filter.value];
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
