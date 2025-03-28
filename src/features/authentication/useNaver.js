import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { postNaverLogIn } from "../../services/apiOauth";

export function useNaver() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: naverLogInMutation, isPending } = useMutation({
    mutationFn: () => postNaverLogIn(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testlogin"] });
    },
  });

  // const { mutate: buddy, isPending } = useMutation({
  //   mutationFn: () => postNaverLogIn(),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["testlogin"] });
  //   },
  // });
  // console.log("buddy:", buddy);

  const naverLogIn = useCallback(async () => {
    console.log("naverlogin called...");
    try {
      const buddy = await naverLogInMutation();
      if (!buddy) {
        return toast.error("알 수 없는 오류가 발생했어요");
      }
      toast.success(`${buddy.buddy_email}님 환영합니다!`, {
        onConfirm: () => navigate("/", { replace: true }),
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return toast.error("error", errorMessage, {
        onConfirm: () => navigate("/", { replace: true }),
      });
    }
  }, [naverLogInMutation, navigate]);

  return { naverLogIn, isPending };
}
