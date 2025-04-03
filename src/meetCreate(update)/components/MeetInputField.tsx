import { useState } from "react";

interface MeetInputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "date" | "time" | "number";
  icon?: React.ReactNode;
  helperText?: string;
  error?: boolean;
  onClick?: () => void;
  readOnly?: boolean;
  suffix?: string;
  centerAlign?: boolean; // ✅ 추가
}

const MeetInputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
  helperText,
  error,
  onClick,
  readOnly,
  suffix,
  centerAlign = false, // ✅ 기본 false
}: MeetInputFieldProps) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder);

  return (
    <div className="w-full mb-6">
      <label className="text-Body1 font-bold mb-2 block">{label}</label>
      <div className="relative w-full">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onClick={onClick}
          onFocus={() => setCurrentPlaceholder("")}
          onBlur={() => setCurrentPlaceholder(placeholder)}
          placeholder={currentPlaceholder}
          readOnly={readOnly}
          className={`w-full border rounded-xl py-3 px-6 pr-10 text-Body2 placeholder:text-gray75 focus:outline-none ${
            error ? "border-activeRed" : "border-gray75"
          } ${centerAlign ? "text-center" : ""}`} // ✅ 가운데 정렬 적용
        />
        {icon && (
          <div className="absolute top-1/2 right-4 -translate-y-1/2">
            {icon}
          </div>
        )}
        {suffix && (
          <div className="absolute top-1/2 right-10 -translate-y-1/2 text-body2">
            {suffix}
          </div>
        )}
      </div>
      {helperText && (
        <p
          className={`text-Caption2 mt-1 ${error ? "text-activeRed" : "text-gray75"}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default MeetInputField;
