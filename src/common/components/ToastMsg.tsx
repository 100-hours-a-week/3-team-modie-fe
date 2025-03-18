import { ToastMsgProps } from "../types/submitType";
import cn from "../../utils/cn";
/**
 * 전역적으로 사용되는 토스트 메세지 컴포넌트 입니다.
 * @author 희진
 */

export default function ToastMsg({ active, description }: ToastMsgProps) {
  return (
    <>
      <div
        className={cn(
          `px-6 h-[3.1rem] rounded-3xl flex justify-center items-center`,
          `shrink-0 bg-black text-white opacity-0 translate-y-2 transition-all duration-500 ease-in-out`,
          active ? `opacity-70 translate-y-0` : `opacity-0 translate-y-2`
        )}
      >
        <div className="text-center text-Caption1 font-normal">
          {description}
        </div>
      </div>
    </>
  );
}
