import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
// import { deleteCabin as deleteScriptApi } from "../../services/apiCabins";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { deleteScript as deleteScriptApi } from "../../services/apiScripts";

export function useDeleteScript() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const intl = useIntl();
  const message = intl.formatMessage({
    id: "toast.success.deleted",
  });
  const errMessage = intl.formatMessage({
    id: "toast.error.processing",
  });
  const { isPending: isDeleting, mutate: deleteScript } = useMutation({
    mutationFn: deleteScriptApi,
    onSuccess: () => {
      toast.success(message);
      queryClient.invalidateQueries({
        queryKey: ["scripts"],
      });
      navigate("/scripts");
    },
    onError: (err) => {
      toast.error(errMessage);
      console.error(err.message);
    },
  });

  return { isDeleting, deleteScript };
}
