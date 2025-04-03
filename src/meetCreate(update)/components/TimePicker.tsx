import { useState, useEffect } from "react";
import Picker from "react-mobile-picker";
import "../styles/timepicker.css";
import dayjs from "dayjs";

interface TimePickerProps {
  onSave: (time: { hour: string; minute: string }) => void;
  onClose: () => void;
  selectedDate: Date | null;
}

export default function TimePicker({
  onSave,
  onClose,
  selectedDate,
}: TimePickerProps) {
  const [pickerValue, setPickerValue] = useState({
    hour: "00",
    minute: "00",
  });

  const hourOptions = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const minuteOptions = Array.from({ length: 12 }, (_, i) =>
    String(i * 5).padStart(2, "0")
  );

  useEffect(() => {
    const now = new Date();
    const currentHour = String(now.getHours()).padStart(2, "0");
    const roundedMinute = Math.ceil(now.getMinutes() / 5) * 5;
    const currentMinute =
      roundedMinute === 60 ? "00" : String(roundedMinute).padStart(2, "0");

    setPickerValue({ hour: currentHour, minute: currentMinute });
  }, []);

  const handleSave = () => {
    const now = new Date();
    const selected = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      Number(pickerValue.hour),
      Number(pickerValue.minute)
    );

    // 선택한 날짜가 오늘일 때만
    if (
      selectedDate &&
      dayjs(selectedDate).isSame(now, "day") &&
      selected < now
    ) {
      alert("현재 시간 이후로 선택해주세요.");
      return;
    }

    onSave(pickerValue);
    onClose();
  };

  return (
    <div
      className="w-full border bg-white z-50 shadow-md rounded-xl px-6 py-6"
      style={{ borderColor: "#c8c8c8" }}
    >
      <div className="relative h-[132px]">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-grayE0 -translate-y-1/2 z-10" />
        <div
          className="absolute top-[calc(50%-22px)] left-0 w-full h-[44px] border-y pointer-events-none z-10"
          style={{ borderColor: "#c8c8c8" }}
        />
        <div className="flex justify-center items-center z-20 relative h-full gap-4">
          <Picker
            value={pickerValue}
            onChange={setPickerValue}
            className="custom-timepicker"
          >
            <Picker.Column name="hour">
              {hourOptions.map((hour) => (
                <Picker.Item key={hour} value={hour}>
                  {hour}
                </Picker.Item>
              ))}
            </Picker.Column>
            <div className="text-[18px] font-bold mx-2">:</div>
            <Picker.Column name="minute">
              {minuteOptions.map((minute) => (
                <Picker.Item key={minute} value={minute}>
                  {minute}
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <button
          onClick={handleSave}
          className="w-80 mt-6 bg-primaryDark2 text-white text-Body2 font-bold py-3 rounded-full z-50 cursor-pointer"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}
