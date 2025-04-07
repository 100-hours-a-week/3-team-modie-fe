import { motion } from "framer-motion";
import logoIcon from "../../assets/logo.svg";

export default function LoadingMap() {
  return (
    <div className="flex flex-col items-center justify-center h-[552px]">
      <motion.img
        src={logoIcon}
        alt="loading"
        className="w-24 h-24 mb-4"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="text-gray9e text-Caption1">지도를 불러오는 중...</div>
    </div>
  );
}
