import { SubmitBtnProps } from "../types/submitType";

export default function SubmitBtn({ active, description }: SubmitBtnProps) {
  return (
    <button
      className={`w-[33.5rem] h-[5.0rem] flex justify-center items-center shrink-0 ${
        active ? "bg-primaryDark2" : "bg-gray61"
      } rounded-md`}
    >
      <div
        className={`text-center text-[1.4rem] ${active ? "font-bold" : "font-normal"} text-white`}
      >
        {description}
      </div>
    </button>
  );
}
