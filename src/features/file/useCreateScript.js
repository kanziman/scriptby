import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useIntl } from "react-intl";
import { createShowAndScript } from "../../services/apiShowScripts";

export function useCreateScript() {
  const intl = useIntl();
  const message = intl.formatMessage({
    id: "toast.scriptUploaded",
    defaultMessage:
      "Script successfully uploaded.(After confirmation, everyone can see)",
  });
  const { mutate: createAll, isPending: isCreating } = useMutation({
    mutationFn: createShowAndScript,
    onSuccess: () => {
      toast.success(message);
    },
    onError: (err) => toast.error(err.message),
  });

  return { createAll, isCreating };
}
