import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getPostById } from "../../services/apiPost";

export function usePost() {
  const { postId } = useParams();

  const { isPending, data: post } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    onError: (err) => toast.error(err.message),
  });

  return { post, isPending };
}
