interface TimeDisplayFieldProps {
  label: string;
  hour: string;
  minute: string;
  onClick?: () => void;
}

export default function TimeDisplayField({
  label,
  hour,
  minute,
  onClick,
}: TimeDisplayFieldProps) {
  return (
    <div className="w-full mb-6">
      <label className="text-Body1 font-bold mb-2 block">{label}</label>
      <div
        onClick={onClick}
        className="w-full border border-gray75 rounded-xl py-3 px-36 text-Body2 flex justify-between items-center cursor-pointer"
      >
        <span className={` ${!hour ? "text-gray75" : "text-gray21"}`}>
          {hour ? `${hour} 시` : "00시"}
        </span>
        <span className={`${!minute ? "text-gray75" : "text-gray21"}`}>
          {minute ? `${minute} 분` : "00분"}
        </span>
      </div>
    </div>
  );
}
