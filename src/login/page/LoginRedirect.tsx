import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function KakaoCallback() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      axios
        .get(`https://dev-api.modie.site/auth/kakao/login?code=${code}`) // ✅ GET 요청으로 변경
        // .get(`http://localhost:8080/auth/kakao/login?code=${code}`) // ✅ GET 요청으로 변경
        .then((res) => {
          console.log("로그인 성공", res.data);
          localStorage.setItem("accessToken", res.data.data);
          navigate("/"); // 로그인 후 메인 페이지로 이동
        })
        .catch((err) => console.error("로그인 실패", err));
    }
  }, [code, navigate]);

  return <div>로그인 처리 중...</div>;
}
