import { useMemo } from "react";
import { handleError } from "../../__sentry__/useErrorHandler";

export const useAuth = () => {
  const extractUserId = (onError: (e: unknown) => void) => {
    try {
      const token = localStorage.getItem("accessToken") || "";
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.userId || payload.sub;
    } catch (e) {
      onError(e);
      return null;
    }
  };

  const userId = useMemo(
    () =>
      extractUserId((e) =>
        handleError(e, {
          type: "auth",
          page: "chat",
          message: "accessToken 디코딩 실패",
          extra: { token: localStorage.getItem("accessToken") },
        })
      ),
    []
  );

  const jwtToken = useMemo(() => localStorage.getItem("accessToken"), []);

  return {
    userId,
    jwtToken,
    isAuthenticated: !!jwtToken,
  };
};
