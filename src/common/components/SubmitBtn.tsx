import { SubmitBtnProps } from "../types/submitType";

/**
 * 전역적으로 사용되는 버튼입니다.
 * @author 희진
 */

export default function SubmitBtn({ active, description }: SubmitBtnProps) {
  return (
    <button
      className={`w-full h-[5.0rem] flex justify-center items-center shrink-0 z-50 ${
        active
          ? "bg-primaryDark2 cursor-pointer"
          : "bg-gray61 cursor-not-allowed"
      } rounded-md`}
    >
      <div
        className={`text-center text-Body2 ${active ? "font-bold" : "font-normal"} text-white`}
      >
        {description}
      </div>
    </button>
  );
}
