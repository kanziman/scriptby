import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  updateCurrentProfile,
  updateUserByAdmin,
} from "../../services/apiAuth";
import { useUser } from "./useUser";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const IsManagerOrMaster = user?.isMaster || user?.isManager;
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    // mutationFn: updateMasterUser,
    // mutationFn: updateUserByAdmin,
    // mutationFn: updateCurrentUser,
    mutationFn: IsManagerOrMaster ? updateUserByAdmin : updateCurrentProfile,
    onSuccess: ({ profile }) => {
      toast.success("Request has been successfully sent.");

      // queryClient.setQueryData(["user"], profile);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
