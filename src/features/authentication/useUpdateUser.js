import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useIntl } from "react-intl";
import {
  updateCurrentProfile,
  updateUserByAdmin,
} from "../../services/apiAuth";
import { useUser } from "./useUser";

export function useUpdateUser() {
  const intl = useIntl();
  const message = intl.formatMessage({
    id: "toast.success.updated",
  });
  const queryClient = useQueryClient();
  const { user } = useUser();
  const IsManagerOrMaster = user?.isMaster || user?.isManager;
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    // mutationFn: updateMasterUser,
    // mutationFn: updateUserByAdmin,
    // mutationFn: updateCurrentUser,
    mutationFn: IsManagerOrMaster ? updateUserByAdmin : updateCurrentProfile,
    onSuccess: ({ profile }) => {
      toast.success(message);

      // queryClient.setQueryData(["user"], profile);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
