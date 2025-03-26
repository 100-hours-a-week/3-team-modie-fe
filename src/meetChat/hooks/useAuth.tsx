import { useMemo } from "react";

export const useAuth = () => {
  const extractUserId = () => {
    try {
      const token = localStorage.getItem("accessToken") || "";
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.userId || payload.sub;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const userId = useMemo(() => extractUserId(), []);
  const jwtToken = useMemo(() => localStorage.getItem("accessToken"), []);

  return {
    userId,
    jwtToken,
    isAuthenticated: !!jwtToken,
  };
};
