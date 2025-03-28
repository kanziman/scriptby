import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getUsersWithPage } from "../../services/apiAuth";
import { PAGE_SIZE } from "../../utils/constants";

// export function useUsers() {
//   const { isPending, data: { data: users, count } = {} } = useQuery({
//     queryKey: ["users"],
//     queryFn: getAllUsers,
//   });
//   return { isPending, users, count };
// }
export function useUsers(pageSize, sortByDefault = "created_at-desc") {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("play");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "play", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || sortByDefault;
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const size = pageSize || PAGE_SIZE;

  // QUERY
  const {
    isPending,
    data: { data: users, count } = {},
    error,
  } = useQuery({
    queryKey: ["users", filter, sortBy, page],
    queryFn: () => getUsersWithPage({ filter, sortBy, page, size }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / size);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["users", filter, sortBy, page + 1],
      queryFn: () => getUsersWithPage({ filter, sortBy, page: page + 1, size }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["users", filter, sortBy, page - 1],
      queryFn: () => getUsersWithPage({ filter, sortBy, page: page - 1, size }),
    });
  }

  return { isPending, users, error, count };
}
