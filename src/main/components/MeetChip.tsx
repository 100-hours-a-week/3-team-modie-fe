import cn from "../../utils/cn.ts";

interface MeetChipProps {
  title: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function MeetChip({
  title,
  isSelected = false,
  onClick,
}: MeetChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2.5 rounded-full w-fit h-fit self-stretch px-[1.6rem] py-[0.8rem]",
        " text-center text-Body2 align-middle",
        "min-w-[60px] cursor-pointer",
        isSelected
          ? "bg-primaryDark2 font-bold text-white"
          : "bg-white border-1 border-gray75 font-pretendard text-gray75"
      )}
    >
      {title}
    </button>
  );
}
