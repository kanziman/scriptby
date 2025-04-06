import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const intl = useIntl();
  const message = intl.formatMessage({
    id: "toast.incorrectCredentials",
    defaultMessage: "Provided email or password are incorrect",
  });
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (profile) => {
      // console.log("profile:", profile);
      queryClient.setQueryData(["user"], profile);
      // console.log("user:", user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error(message);
    },
  });

  return { login, isPending };
}
