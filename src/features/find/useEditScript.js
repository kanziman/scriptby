import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditScript } from "../../services/apiScripts";

export function useEditScript() {
  const queryClient = useQueryClient();

  const { mutate: editScript, isPending: isEditing } = useMutation({
    mutationFn: ({ newScript, id }) => createEditScript(newScript, id),
    onSuccess: () => {
      toast.success("Script successfully edited");
      queryClient.invalidateQueries({ queryKey: ["scripts"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editScript };
}
