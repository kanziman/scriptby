import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createShowAndScript } from "../../services/apiShowScripts";

export function useCreateScript() {
  const { mutate: createAll, isLoading: isCreating } = useMutation({
    mutationFn: createShowAndScript,
    onSuccess: () => {
      toast.success("Script successfully uploaded");
    },
    onError: (err) => toast.error(err.message),
  });

  return { createAll, isCreating };
}
