import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useIntl } from "react-intl";
import { deletePostById } from "../../services/apiPost";

export function useDeletePost() {
  const queryClient = useQueryClient();

  const intl = useIntl();
  const message = intl.formatMessage({
    id: "toast.success.deleted",
  });

  const { isPending: isDeleting, mutate: deletePost } = useMutation({
    mutationFn: deletePostById,
    onSuccess: () => {
      toast.success(message);

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deletePost };
}
