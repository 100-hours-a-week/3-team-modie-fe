import { motion } from "framer-motion";
import cn from "../../utils/cn.ts";
import logoIcon from "../../assets/logo.svg";

export default function Splash() {
  return (
    <div
      className={cn(
        "flex flex-col w-screen h-screen bg-white",
        "justify-between items-center px-[2rem] gap-[6rem] pb-[5rem]"
      )}
    >
      <div className="self-stretch flex-1 pt-[2rem] pb-[21rem] flex flex-col justify-center items-center gap-[5rem]">
        {/* 로고 애니메이션 */}
        <motion.div
          className="flex justify-center items-center w-[25.6rem] h-fit px-2 py-16 flex-shrink-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={logoIcon}
            alt="logo"
            className="w-[25rem] h-[9.3rem] ml-4"
          />
        </motion.div>

        {/* 텍스트 애니메이션 */}
        <motion.div
          className={cn("text-center", "text-gray21 text-Title font-bold")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <br />
          같이 하면 더 편하고, 싸고,
          <br />
          재미있어지니까! 🙌🏻
        </motion.div>
      </div>
    </div>
  );
}
