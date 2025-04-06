import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useIntl } from "react-intl";
import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const intl = useIntl();
  const message = intl.formatMessage({
    id: "signup.success",
    defaultMessage: "Account successfully created!",
  });
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(message);
    },
  });

  return { signup, isPending };
}
