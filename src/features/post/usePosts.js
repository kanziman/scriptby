import { useQuery } from "@tanstack/react-query";
import { getPostsWithFilter } from "../../services/apiPost";

export function usePosts() {
  const { isPending, data } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostsWithFilter,
    // queryFn: getPosts,
  });
  const posts = data?.data;
  const count = data?.count;

  return { isPending, posts, count };
}
