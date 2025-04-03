import { motion } from "framer-motion";
import cn from "../../utils/cn.ts";
import logoIcon from "../../assets/logo.svg";

export default function Splash() {
  return (
    <div
      className={cn(
        "flex flex-col w-full h-screen bg-white",
        "justify-center items-center px-[2rem]"
      )}
    >
      {/* 로고 + 앱 이름 */}
      <motion.div
        className="flex flex-col items-center gap-[1.6rem]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <img src={logoIcon} alt="logo" className="w-[20rem] h-[7.5rem]" />
      </motion.div>

      {/* 서브 텍스트 */}
      <motion.p
        className="text-center text-gray60 text-Body1 mt-[6rem] leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 1 }}
      >
        같이 하면 더 편하고, 싸고,
        <br />
        재미있어지니까 🙌🏻
      </motion.p>
    </div>
  );
}
