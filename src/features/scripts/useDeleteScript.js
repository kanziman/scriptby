import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
// import { deleteCabin as deleteScriptApi } from "../../services/apiCabins";
import { deleteScript as deleteScriptApi } from "../../services/apiScripts";

export function useDeleteScript() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteScript } = useMutation({
    mutationFn: deleteScriptApi,
    onSuccess: () => {
      toast.success("Script successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["scripts"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteScript };
}
