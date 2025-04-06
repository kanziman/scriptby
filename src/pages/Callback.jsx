// import { useAuth } from "@/hooks/auth";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";

const LoadingPage = () => {
  // const { naverLogIn } = useNaver();
  const intl = useIntl();
  const message = intl.formatMessage({
    id: "toast.success.login",
  });
  const navigate = useNavigate();
  const { user: currentUser } = useUser();

  // useEffect(() => {
  //   if (window.location.hash) {
  //     const hash = window.location.hash.substring(1);
  //     const params = new URLSearchParams(hash);
  //     const accessToken = params.get("access_token");
  //     if (accessToken) {
  //       naverLogIn();
  //     }
  //   }
  //   // naverLogIn 은 반드시 useCallback 처리되어 있어야 함
  // }, [naverLogIn]);

  useEffect(() => {
    // URL에서 해시 파라미터 확인

    if (currentUser) {
      // 성공 페이지로 리다이렉트
      toast.success(message);
      navigate("/dashboard");
    }
  }, [currentUser, navigate, message]);

  return <div>Loading...</div>;
};

export default LoadingPage;
