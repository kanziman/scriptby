import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getScriptsWithFilterV1 } from "../../services/apiScripts";
import { PAGE_SIZE } from "../../utils/constants";
import { cleansingData } from "../../utils/helpers";

/// SCRIPT ALL PAGE
// export function useScript(pageSize) {
//   const [searchParams] = useSearchParams();
//   // const { showId } = useParams();

//   // FILTER
//   const filterValue = searchParams.get("category");
//   const filter =
//     !filterValue || filterValue === "all"
//       ? null
//       : { field: "show_category", value: filterValue };

//   // SORT
//   const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
//   const [field, direction] = sortByRaw.split("-");
//   const sortBy = { field, direction };

//   // PAGINATION
//   const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
//   const size = pageSize || PAGE_SIZE;

//   // QUERY
//   const {
//     isPending: isLoading,
//     data: { data, count } = {},
//     error,
//   } = useQuery({
//     queryKey: ["scripts", filter, sortBy, page],
//     // queryFn: () => getScripts({ filter, sortBy, page }),
//     queryFn: () => getScriptsWithFilterV1({ filter, sortBy, page, size }),
//   });

//   const scripts =
//     data?.map((script) => ({
//       ...script,
//       show: cleansingData(script?.tv),
//     })) || [];

//   return { isLoading, error, scripts, count };
// }

export function useScript(pageSize) {
  const [searchParams] = useSearchParams();

  // FILTER
  const query = searchParams.get("query");
  const filterValue = searchParams.get("category");
  const show_id = searchParams.get("show_id");
  const episode_number = searchParams.get("episode_number");
  const status = searchParams.get("status");

  let filter = [];
  if (filterValue && filterValue !== "all") {
    filter.push({ field: "show_category", value: filterValue });
  }
  if (show_id) {
    filter.push({ field: "show_id", value: show_id });
  }
  if (episode_number) {
    filter.push({ field: "episode_number", value: episode_number });
  }
  /// confirmed or ALL(pending, unconfirmed)
  if (status && status === "confirmed") {
    filter.push({ field: "status", value: status });
  }
  if (filter.length === 0) {
    filter = null;
  }

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
    queryKey: ["scripts", filter, sortBy, page, query],
    queryFn: ({ signal }) =>
      getScriptsWithFilterV1({ filter, sortBy, page, size, query, signal }),
  });

  const scripts =
    data?.map((script) => ({
      ...script,
      show: cleansingData(script?.tv),
    })) || [];

  return { isLoading, error, scripts, count };
}
