import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateShowAndScript } from "../../services/apiShowScripts";

export function useUpdateScript() {
  const queryClient = useQueryClient();

  const { mutate: editAll, isLoading: isUpdating } = useMutation({
    mutationFn: updateShowAndScript,
    onSuccess: () => {
      toast.success("Script successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });

  return { editAll, isUpdating };
}
