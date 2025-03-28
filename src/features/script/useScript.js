import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getScriptsWithFilter } from "../../services/apiScripts";
import { PAGE_SIZE } from "../../utils/constants";
import { cleansingData } from "../../utils/helpers";

/// SCRIPT ALL PAGE
export function useScript(pageSize) {
  const [searchParams] = useSearchParams();
  // const { showId } = useParams();

  // FILTER
  const filterValue = searchParams.get("category");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "show_category", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const size = pageSize || PAGE_SIZE;

  // QUERY
  const {
    isPending: isLoading,
    data: { data, count } = {},
    error,
  } = useQuery({
    queryKey: ["scripts", filter, sortBy, page],
    // queryFn: () => getScripts({ filter, sortBy, page }),
    queryFn: () => getScriptsWithFilter({ filter, sortBy, page, size }),
  });

  const scripts =
    data?.map((script) => ({
      ...script,
      show: cleansingData(script?.tv),
    })) || [];

  return { isLoading, error, scripts, count };
}
