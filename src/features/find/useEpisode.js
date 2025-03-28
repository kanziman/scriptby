import { useQuery as useTanStackQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useQuery } from "../../context/QueryContext";
import { getScriptsByShowId } from "../../services/apiScripts";

/// 쇼=>시즌이 선택되면 scripts테이블에서 쇼id에 해당하는 script정보를 가지고와 script가 있는 episode인지 확인한다.
export function useEpisode(showId) {
  const { episodes, dispatch } = useQuery();
  // const showId = showId;

  // QUERY
  const {
    isPending,
    data: { data: scripts, count } = {},
    error,
  } = useTanStackQuery({
    queryKey: ["showScripts", showId],
    queryFn: () => getScriptsByShowId(showId),
    enabled: Boolean(showId),
  });

  useEffect(() => {
    // console.log("use episode effect..?", scripts);
    if (scripts && episodes && episodes.length > 0) {
      const updatedEpisodes = episodes.map((ep) => {
        const matchingScripts = scripts.filter(
          (s) =>
            showId === s.show_id &&
            s.season_number === ep.season_number &&
            s.episode_number === ep.episode_number
        );
        // console.log("matching scripts for ep:", showId, matchingScripts);
        return { ...ep, scripts: matchingScripts };
      });

      if (JSON.stringify(updatedEpisodes) !== JSON.stringify(episodes)) {
        dispatch({ type: "episodes/update", payload: updatedEpisodes });
      }
      console.log("updatedEpisodes:", updatedEpisodes);
    }
  }, [scripts, episodes, dispatch, showId]);

  return { isPending, error, scripts, count };
}
