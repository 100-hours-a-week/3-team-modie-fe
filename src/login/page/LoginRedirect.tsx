import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Splash from "../../common/page/Splash";
import { initFCM } from "../../__fcm__/fcm";
import * as Sentry from "@sentry/react";
import { getUserService } from "../../my/services/getUserService";

export default function KakaoCallback() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const login_url = import.meta.env.VITE_LOGIN_URI;
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      axios
        .get(`${login_url}?code=${code}`)
        .then(async (res) => {
          const accessToken = res.data.data;
          localStorage.setItem("accessToken", accessToken);

          try {
            // 유저 정보 불러와서 Sentry 사용자 정보 설정
            const userRes = await getUserService(accessToken);

            const user = userRes.data;

            Sentry.setUser({
              id: user.userId.toString(),
              username: user.userName,
            });
          } catch (userError) {
            Sentry.captureException(userError);
          }

          await initFCM();

          const redirectPath =
            localStorage.getItem("afterLoginRedirect") || "/";
          localStorage.removeItem("afterLoginRedirect");
          navigate(redirectPath);
        })
        .catch((e) => {
          Sentry.captureException(e);
        });
    }
  }, [code, navigate]);

  return <Splash />;
}
