import cn from "../../utils/cn";

interface CategoryBoxProps {
  icon: string;
  label: string;
  isActive?: boolean;
  onClick?: (label: string) => void;
  width?: string;
  height?: string;
}

/**
 * 모임 유형 컴포넌트 (화면 크기에 따라 유동/고정 크기 지원)
 * @author 희진
 */
const CategoryBox = ({
  icon,
  label,
  isActive = false,
  onClick,
  width,
  height,
}: CategoryBoxProps) => {
  const hasCustomSize = width || height;

  return (
    <div
      className={cn(
        width,
        height,
        (!hasCustomSize && "w-full relative pb-[83.333%]") as string | undefined
      )}
    >
      <button
        onClick={() => onClick?.(label)}
        className={cn(
          hasCustomSize ? undefined : "absolute inset-0",
          "w-full h-full flex flex-col gap-2 justify-center items-center rounded-3xl border",
          "text-Body2 text-gray42 font-bold transition-all duration-200",
          isActive ? "border-3 border-primaryDark3" : "border-1 border-gray75"
        )}
        style={{ boxShadow: "5px 5px 10px 0px rgba(0, 0, 0, 0.07)" }}
      >
        <img src={icon} alt={label} />
        <div>{label}</div>
      </button>
    </div>
  );
};

export default CategoryBox;
