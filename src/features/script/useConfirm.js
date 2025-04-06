import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useIntl } from "react-intl";
import { confirmScript } from "../../services/apiScripts";

export function useConfirm() {
  const queryClient = useQueryClient();
  const intl = useIntl();
  const message = intl.formatMessage({
    id: "toast.success.confirmed",
  });
  const errMessage = intl.formatMessage({
    id: "toast.error.processing",
  });
  const { mutate: confirm, isPending } = useMutation({
    mutationFn: ({ scriptId, status }) => confirmScript(scriptId, { status }),

    onSuccess: () => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["scripts"] });
    },

    onError: (err) => {
      toast.error(errMessage);
      console.error(err.message);
    },
  });

  return { confirm, isPending };
}
