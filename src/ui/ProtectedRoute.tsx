import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import FullPage from "./Basic/FullPage";
import Spinner from "./Spinner";

type ProtectedRouteProps = {
  requiredRole?: string | string[];
  requiredPlay?: string | string[];
};

function ProtectedRoute({
  requiredRole,
  requiredPlay,
}: ProtectedRouteProps): JSX.Element | null {
  const navigate = useNavigate();
  const { isPending, isAuthenticated, user } = useUser();

  // 로그인 리디렉션
  useEffect(() => {
    if (!isAuthenticated && !isPending) {
      navigate("/login");
    }
  }, [isAuthenticated, isPending, navigate]);

  // 로딩 중일 때 전체 화면 로딩
  if (isPending) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 권한 검사 공통 함수
  const isValid = (value: string | undefined, rule?: string | string[]) => {
    if (!rule) return true;
    if (Array.isArray(rule)) return rule.includes(value ?? "");
    return value === rule;
  };

  // 권한 불충분한 경우
  if (
    !isValid(user?.role, requiredRole) ||
    !isValid(user?.play, requiredPlay)
  ) {
    return (
      <FullPage>
        <div>🔒 Unauthorized access</div>
      </FullPage>
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
