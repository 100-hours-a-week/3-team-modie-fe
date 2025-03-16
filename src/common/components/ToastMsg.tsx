import { ToastMsgProps } from "../types/submitType";

/**
 * 전역적으로 사용되는 토스트 메세지 컴포넌트 입니다.
 * @author 희진
 */

export default function ToastMsg({ active, description }: ToastMsgProps) {
  return (
    <>
      {/* TODO: active시 animation 등은 추후 고려 */}
      {active && (
        <div className="w-[16.5rem] h-[3.1rem] rounded-3xl flex justify-center items-center shrink-0 bg-black opacity-70">
          <div className="text-center text-xs text-white font-normal">
            {description}
          </div>
        </div>
      )}
    </>
  );
}
