import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deletePostById } from "../../services/apiPost";

export function useDeletePost() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deletePost } = useMutation({
    mutationFn: deletePostById,
    onSuccess: () => {
      toast.success("post successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deletePost };
}
