import { SubmitBtnProps } from "../types/submitType";

/**
 * 전역적으로 사용되는 버튼입니다.
 * @author 희진
 */

export default function SubmitBtn({ active, description }: SubmitBtnProps) {
  return (
    <button
      className={`w-[33.5rem] h-[5.0rem] flex justify-center items-center shrink-0 ${
        active ? "bg-primaryDark2" : "bg-gray61"
      } rounded-md`}
    >
      <div
        className={`text-center text-sm ${active ? "font-bold" : "font-normal"} text-white`}
      >
        {description}
      </div>
    </button>
  );
}
