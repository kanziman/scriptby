import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getPostById } from "../../services/apiPost";

export function useImages() {
  const { postId } = useParams();

  const { isPending, data: uploadImage } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    onError: (err) => toast.error(err.message),
  });

  return { uploadImage, isPending };
}
