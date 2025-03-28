import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getNewScriptsWithinAWeek } from "../../services/apiScripts";

export function useNewScripts({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("new-script") || options.at(0).value;
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "show_category", value: filterValue };

  const { isPending, data: { data: newScripts, count } = {} } = useQuery({
    queryKey: ["newScripts", filter],
    // queryFn: getNewScriptsWithinAWeek,
    queryFn: () => getNewScriptsWithinAWeek({ filter }),
  });
  return { isPending, newScripts, count };
}
