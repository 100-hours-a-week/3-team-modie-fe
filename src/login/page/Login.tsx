import { motion } from "framer-motion";
import logoIcon from "../../assets/logo.svg";
import kakaoLogin from "../../assets/kakao_login_large_wide.png";

const key = import.meta.env.VITE_KAKAO_REST_API_KEY;
const redirectUrl = import.meta.env.VITE_KAKAO_REDIRECT_URI;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${key}&redirect_uri=${redirectUrl}&response_type=code`;

export default function Login() {
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen items-center justify-center w-full bg-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* 로고 */}
      <motion.div
        className="flex justify-center items-center w-fit h-fit px-2 py-16 flex-shrink-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <img src={logoIcon} alt="logo" className="w-[25rem] h-[9.3rem] ml-4" />
      </motion.div>

      {/* 텍스트 */}
      <motion.div
        className="text-Title font-bold text-center text-gray21"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        같이 하면 더 편하고, 싸고, <br />
        재밌어지니까! 🙌🏻
      </motion.div>

      {/* 버튼 */}
      <motion.button
        onClick={handleLogin}
        className="flex items-center justify-center w-[32.8rem] h-[5rem] bg-[#FEE500] text-black font-bold text-base rounded-md shadow-md mt-[10rem] mb-[5rem]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <img
          className="w-[32.8rem] h-[5rem] cursor-pointer"
          src={kakaoLogin}
          alt="kakaoLogin"
        />
      </motion.button>
    </motion.div>
  );
}
