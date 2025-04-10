import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useIntl } from "react-intl";
import { updateShowAndScript } from "../../services/apiCreateUpdateScripts";

export function useUpdateScript() {
  const intl = useIntl();
  const message = intl.formatMessage({
    id: "toast.success.updated",
    defaultMessage: "Script successfully updated.",
  });
  const { mutate: editAll, isPending: isUpdating } = useMutation({
    mutationFn: updateShowAndScript,
    onSuccess: () => {
      toast.success(message);
    },
    onError: (err) => toast.error(err.message),
  });

  return { editAll, isUpdating };
}
