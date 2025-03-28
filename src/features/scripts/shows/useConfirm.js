import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { confirmScript } from "../../../services/apiScripts";

export function useConfirm() {
  const queryClient = useQueryClient();
  const { mutate: confirm, isPending } = useMutation({
    mutationFn: ({ scriptId, status }) => confirmScript(scriptId, { status }),

    onSuccess: () => {
      toast.success(`Confirming successfully checked out`);
      queryClient.invalidateQueries({ queryKey: ["scripts"] });
    },

    onError: () => {
      toast.error("There was an error while confirming");
    },
  });

  return { confirm, isPending };
}
