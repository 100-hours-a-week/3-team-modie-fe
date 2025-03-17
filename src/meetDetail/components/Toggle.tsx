import { useState } from "react";

interface ToggleProps {
  initial?: boolean;
}

const Toggle = ({ initial = false }: ToggleProps) => {
  const [checked, setChecked] = useState(initial);

  return (
    <div
      className={`relative w-[59px] h-[17px] rounded-full cursor-pointer px-2 flex items-center transition-colors duration-300 ${
        checked ? "bg-[#00BCD4]" : "bg-gray9e"
      }`}
      style={{
        boxShadow: "inset 0px 6px 8px 3px rgba(0, 0, 0, 0.1)",
      }}
      onClick={() => setChecked((prev) => !prev)}
    >
      <span
        className={`absolute text-Caption2 text-white transition-colors duration-300 ${
          checked ? "left-2" : "right-2"
        }`}
      >
        정산완료
      </span>

      <div
        className={`absolute top-1/2 -translate-y-1/2 w-[11px] h-[11px] bg-white rounded-full shadow-md transition-all duration-1000 ease-in-out ${
          checked ? "right-2" : "left-2"
        }`}
      />
    </div>
  );
};

export default Toggle;
