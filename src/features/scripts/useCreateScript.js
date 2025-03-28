import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditScript } from "../../services/apiScripts";

export function useCreateScript() {
  const queryClient = useQueryClient();

  const { mutate: createScript, isPending: isCreating } = useMutation({
    mutationFn: createEditScript,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["scripts"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createScript };
}
