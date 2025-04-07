import { motion } from "framer-motion";
import cn from "../../utils/cn.ts";
import logoIcon from "../../assets/logo.svg";

export default function Fallback() {
  return (
    <div
      className={cn(
        "flex flex-col w-full h-screen",
        "justify-center items-center px-[2rem]"
      )}
    >
      <motion.img
        src={logoIcon}
        alt="logo"
        className="w-[6rem] h-[6rem] mb-[2rem]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      <motion.p
        className="text-gray75 text-Body2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        잠시만 기다려주세요...
      </motion.p>
    </div>
  );
}
