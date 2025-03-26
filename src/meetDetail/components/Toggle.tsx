import { useDebouncedToggle } from "../hooks/useDebouncedToggle";

interface ToggleProps {
  initial?: boolean;
  onChange?: (checked: boolean) => boolean | Promise<boolean>;
  delay?: number;
}

/**
 * 모임 멤버의 정산 상태를 토글할 수 있는 컴포넌트입니다.
 * @author 희진
 */

const Toggle = ({
  initial = false,
  onChange = () => true,
  delay,
}: ToggleProps) => {
  const { checked, toggle } = useDebouncedToggle(initial, onChange, delay);

  return (
    <div
      className={`relative w-[59px] h-[17px] rounded-full cursor-pointer px-2 flex items-center transition-colors duration-300 curosr-pointer z-100 ${
        checked ? "bg-primaryDark2" : "bg-grayBd border-1 border-gray9e"
      }`}
      style={{
        boxShadow: "inset 0px 6px 8px 3px rgba(0, 0, 0, 0.1)",
      }}
      onClick={toggle}
    >
      <span
        className={`absolute text-Caption2 text-white transition-colors duration-300 ${
          checked ? "left-2" : "right-2"
        }`}
      >
        정산완료
      </span>

      <div
        className={`absolute top-1/2 -translate-y-1/2 w-[11px] h-[11px] bg-white rounded-full shadow-md transition-[left,transform] duration-1000 ${
          checked ? "right-2" : "left-2"
        }`}
        style={{
          filter: "drop-shadow(-2px 1px 6px rgba(0, 0, 0, 0.25))",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </div>
  );
};

export default Toggle;
