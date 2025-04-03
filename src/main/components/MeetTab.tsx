interface MeetTapProps {
  title: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function MeetTap({
  title,
  isSelected = false,
  onClick,
}: MeetTapProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center w-full self-stretch cursor-pointer"
    >
      <div
        className={`
          w-full text-center text-Body1 align-middle py-[0.5rem] pb-[0.9rem]
          ${
            isSelected
              ? "font-bold text-primaryDark2 border-b-2 border-primaryDark2"
              : "text-gray61 border-b border-gray61"
          }
        `}
      >
        {title}
      </div>
    </div>
  );
}
