import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/datepicker.css";

interface DatePickerProps {
  value: Date | null;
  onChange: (value: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

export default function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
}: DatePickerProps) {
  return (
    <div className="w-full flex justify-center items-center">
      <Calendar
        onChange={(value) => {
          if (value instanceof Date) {
            onChange(value);
          }
        }}
        value={value}
        minDate={minDate}
        maxDate={maxDate}
        locale="ko-KR"
        calendarType="gregory"
        formatDay={(_, date) => date.getDate().toString()}
        formatMonthYear={(_, date) =>
          `${date.getFullYear()}년 ${date.getMonth() + 1}월`
        }
        prev2Label={null}
        next2Label={null}
        tileClassName={({ date: d, view }) => {
          const isToday =
            d.toDateString() === new Date().toDateString() && view === "month";
          return isToday ? "text-primaryDark2 font-bold" : "";
        }}
        className="w-full text-gray21 font-semibold text-[14px]"
      />
    </div>
  );
}
