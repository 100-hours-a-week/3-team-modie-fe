import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Splash from "../../common/page/Splash";

export default function KakaoCallback() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  // const login_url = import.meta.env.VITE_LOGIN_URI;
  const login_url = "https://dev-api.modie.site/auth/kakao/login";
  const navigate = useNavigate();
  const login_vite = import.meta.env.VITE_LOGIN;

  useEffect(() => {
    if (code) {
      console.log(`login_vite : ${login_vite}`);
      axios
        .get(`${login_url}?code=${code}`) // ✅ GET 요청으로 변경
        // .get(`http://localhost:8080/auth/kakao/login?code=${code}`) // ✅ GET 요청으로 변경
        .then((res) => {
          console.log("로그인 성공", res.data);
          localStorage.setItem("accessToken", res.data.data);

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
