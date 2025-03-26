import { Navigate } from "react-router-dom";

export default function RedirectIfAuthenticated({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem("accessToken");

  // accessToken이 있으면 메인으로 리디렉션
  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
