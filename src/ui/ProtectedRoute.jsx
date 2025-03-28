import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import FullPage from "./Basic/FullPage";
import Spinner from "./Spinner";

function ProtectedRoute({ children, requiredRole, requiredPlay }) {
  const navigate = useNavigate();
  const { isPending, isAuthenticated, user } = useUser();

  // 인증 상태가 확정되지 않았으면 로그인 페이지로 리디렉션
  useEffect(() => {
    if (!isAuthenticated && !isPending) {
      navigate("/login");
    }
  }, [isAuthenticated, isPending, navigate]);

  // 로딩 중이면 전체 화면 스피너를 보여줌
  if (isPending) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // role 검증
  if (requiredRole) {
    if (typeof requiredRole === "string" && user?.role !== requiredRole) {
      return <div>Unauthorized access.</div>;
    }
    if (
      Array.isArray(requiredRole) &&
      (!user?.role || !requiredRole.includes(user.role))
    ) {
      return <div>Unauthorized access.</div>;
    }
  }

  // play 검증 (navigate 호출 제거)
  if (requiredPlay) {
    if (typeof requiredPlay === "string" && user?.play !== requiredPlay) {
      return <div>Unauthorized access.</div>;
    }
    if (
      Array.isArray(requiredPlay) &&
      (!user?.play || !requiredPlay.includes(user.play))
    ) {
      return <div>Unauthorized access.</div>;
    }
  }

  // 인증된 경우 자식 컴포넌트를 렌더링
  if (isAuthenticated) {
    return <Outlet />;
  }

  return null;
}

export default ProtectedRoute;
