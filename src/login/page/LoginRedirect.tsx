import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Splash from "../../common/page/Splash";
import { initFCM } from "../../__fcm__/fcm";

export default function KakaoCallback() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const login_url = import.meta.env.VITE_LOGIN_URI;
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      axios
        .get(`${login_url}?code=${code}`)
        .then((res) => {
          localStorage.setItem("accessToken", res.data.data);

          initFCM();

          const redirectPath =
            localStorage.getItem("afterLoginRedirect") || "/";
          localStorage.removeItem("afterLoginRedirect");
          navigate(redirectPath);
        })
        .catch((err) => console.error("로그인 실패", err));
    }
  }, [code, navigate]);

  return <Splash />;
}
