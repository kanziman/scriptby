import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { getScriptDataById } from "../../services/apiScripts";
import { PAGE_SIZE } from "../../utils/constants";
import { cleansingData, sliceDataLeftRight } from "../../utils/helpers";

// export function useScriptOne({ scriptId, isToggled }) {
export function useScriptOne({ scriptId, isToggled, activeTabValue } = {}) {
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // FILTER
  const filterValue = searchParams.get("dataType");
  const filter = { field: "dataType", value: filterValue || "lines" };

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
    // show_category: showCategory,
  } = script;

  const lines = script["lines"] || [];
  const slicedLines = isToggled
    ? lines.slice((page - 1) * 2 * PAGE_SIZE, page * 2 * PAGE_SIZE)
    : lines.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  let dataToRender;
  if (isToggled) {
    dataToRender = sliceDataLeftRight(slicedLines);
  } else {
    dataToRender = slicedLines;
  }

  const count = script["lines"].length;

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
    // tvId,
    // showCategory,
    // movieTitle,
    show: cleansingData(script?.tv),
  };
}
