import cn from "../../utils/cn";

interface CategoryBoxProps {
  icon: string;
  label: string;
  isActive?: boolean;
  onClick: (label: string) => void;
}

/**
 * 모임 유형 컴포넌트
 * @author 희진
 */

const CategoryBox = ({
  icon,
  label,
  isActive = false,
  onClick,
}: CategoryBoxProps) => {
  return (
    <button
      onClick={() => onClick(label)}
      className={cn(
        "min-w-[100px] w-[120px] h-[100px] flex flex-col gap-2 justify-center items-center  rounded-3xl border",
        "text-Body2 text-gray42 font-bold transition-all duration-200",
        isActive ? "border-3 border-primaryDark3" : "border-1 border-gray75"
      )}
      style={{ boxShadow: "5px 5px 10px 0px rgba(0, 0, 0, 0.07)" }}
    >
      <img src={icon} alt={label} />
      <div>{label}</div>
    </button>
  );
};

export default CategoryBox;
