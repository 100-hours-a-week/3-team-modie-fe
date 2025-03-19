import { useState } from "react";
import dayjs from "dayjs";
import Header from "../../common/components/Header";
import ProgressBar from "../../common/components/ProgressBar";
import CalendarIcon from "../../assets/calendar.svg";
import MeetInputField from "../components/MeetInputField";
import CostToggle from "../components/CostToggle";
import DatePicker from "../components/DatePicker";
import TimePicker from "../components/TimePicker";
import TimeDisplayField from "../components/TimeDisplayField";
// 추가 import
import SubmitBtn from "../../common/components/SubmitBtn";
import ToastMsg from "../../common/components/ToastMsg";
import { useNavigate } from "react-router-dom";

export default function CreateMeetOther() {
  const today = dayjs();
  const maxDate = today.add(1, "year");

  const [dateInput, setDateInput] = useState("");
  const [dateError, setDateError] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [time, setTime] = useState({ hour: "", minute: "" });
  const [memberCount, setMemberCount] = useState("");
  const [memberError, setMemberError] = useState("");
  const [hasCost, setHasCost] = useState(false);
  const [cost, setCost] = useState("");
  const [costError, setCostError] = useState("");

  // 추가된 state
  const [showTimePicker, setShowTimePicker] = useState(false);

  // 시간 필드 클릭 핸들러 수정
  const handleTimePickerOpen = () => {
    setShowTimePicker(true);
  };

  // TimePicker onSave 함수
  const handleTimeSave = (selected: { hour: string; minute: string }) => {
    setTime(selected);
    setShowTimePicker(false);
  };

  const validateDate = (value: string) => {
    const formatRegex = /^\d{4}\.\d{2}\.\d{2}$/;
    if (!formatRegex.test(value)) {
      setDateError("올바르지 않은 날짜 형식입니다. (yyyy.mm.dd)");
      return false;
    }

    const parsed = dayjs(value, "YYYY.MM.DD", true);
    if (!parsed.isValid()) {
      setDateError("올바르지 않은 날짜 형식입니다. (yyyy.mm.dd)");
      return false;
    }

    if (parsed.isBefore(today, "day")) {
      setDateError("올바르지 않은 날짜입니다.");
      return false;
    }

    if (parsed.isAfter(maxDate, "day")) {
      setDateError("최대 1년 이내 일정만 등록 가능합니다.");
      return false;
    }

    setDateError("");
    return true;
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // 숫자만 추출
    const numbersOnly = value.replace(/\D/g, "");

    const num = parseInt(numbersOnly);

    const formatted = num ? Number(num).toLocaleString() : "";

    // 자동 포맷 삽입: yyyy.mm.dd
    if (formatted.length <= 8) {
      if (formatted.length <= 4) {
        value = numbersOnly;
      } else if (numbersOnly.length <= 6) {
        value = `${numbersOnly.slice(0, 4)}.${numbersOnly.slice(4)}`;
      } else {
        value = `${numbersOnly.slice(0, 4)}.${numbersOnly.slice(4, 6)}.${numbersOnly.slice(6)}`;
      }
    }

    setDateInput(value);

    if (validateDate(value)) {
      setSelectedDate(dayjs(value, "YYYY.MM.DD").toDate());
    } else {
      setSelectedDate(null);
    }
  };

  const handleCalendarDateChange = (date: Date) => {
    const formatted = dayjs(date).format("YYYY.MM.DD");
    setDateInput(formatted);
    setSelectedDate(date);
    setDateError("");
    setShowCalendar(false); // 달력 닫기
  };

  const handleMemberChange = (value: string) => {
    const onlyNumber = value.replace(/\D/g, "");
    setMemberCount(onlyNumber);

    const num = parseInt(onlyNumber, 10);
    if (num < 1) setMemberError("최소 인원은 1명입니다.");
    else if (num > 30) setMemberError("최대 인원은 30명입니다.");
    else setMemberError("");
  };

  const handleCostChange = (value: string) => {
    // 숫자만 추출
    const raw = value.replace(/,/g, "").replace(/\D/g, "");

    // 제한 범위 확인
    const num = parseInt(raw, 10);

    // 유효 범위가 아닐 경우에도 포맷은 유지
    const formatted = raw ? Number(raw).toLocaleString() : "";
    setCost(formatted);

    // 유효성 체크
    if (raw === "") {
      setCostError("");
    } else if (num < 1000) {
      setCostError("최소 금액은 1,000원입니다.");
    } else if (num > 10000000) {
      setCostError("최대 금액은 10,000,000원입니다.");
    } else {
      setCostError("");
    }
  };

  // 내부 state 추가
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  // ✅ 버튼 활성화 조건
  const isFormValid = () => {
    if (!dateInput) return false;
    if (!time.hour || !time.minute) return false;
    if (!memberCount) return false;
    if (hasCost && !cost) return false;
    return true;
  };

  // ✅ Toast 표시 함수
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // ✅ 다음 버튼 클릭 핸들러
  const handleSubmit = () => {
    if (!dateInput) return triggerToast("날짜를 입력해 주세요");
    if (!time.hour || !time.minute)
      return triggerToast("모임 시간을 입력해 주세요");
    if (!memberCount) return triggerToast("모집 인원을 입력해 주세요");
    if (hasCost && !cost) return triggerToast("예상 비용을 입력해 주세요");

    navigate("/createMeetLast"); // ✅ CreateMeetLast 페이지로 이동
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header title="기타 정보 작성" />
      <ProgressBar width={75} />

      <div className="px-6 mt-6">
        {/* 날짜 입력 */}
        <MeetInputField
          label="날짜를 정해주세요."
          value={dateInput}
          onChange={(e) => handleDateInputChange(e)}
          type="text"
          placeholder="2025.01.01"
          icon={
            <img
              src={CalendarIcon}
              alt="calendar"
              onClick={() => setShowCalendar((prev) => !prev)}
              className="cursor-pointer"
            />
          }
          error={!!dateError}
          helperText={dateError}
        />

        {showCalendar && (
          <div className="mt-1">
            <DatePicker
              value={selectedDate}
              onChange={handleCalendarDateChange}
              minDate={today.toDate()}
              maxDate={maxDate.toDate()}
            />
          </div>
        )}

        {/* 시간 */}
        <TimeDisplayField
          label="모임 시간"
          hour={time.hour}
          minute={time.minute}
          onClick={handleTimePickerOpen}
        />
        {showTimePicker && (
          <div className="mt-1">
            <TimePicker
              onSave={handleTimeSave}
              onClose={() => setShowTimePicker(false)}
            />
          </div>
        )}

        {/* 모집 인원 */}
        <MeetInputField
          label="모집 인원"
          value={memberCount}
          onChange={(e) => handleMemberChange(e)}
          placeholder="1~30"
          type="number"
          suffix="명"
          error={!!memberError}
          helperText={memberError}
          centerAlign // ✅ 가운데 정렬 적용
        />

        {/* 비용 발생 여부 토글 */}
        <CostToggle hasCost={hasCost} setHasCost={setHasCost} />

        {/* 예상 비용 */}
        {hasCost && (
          <MeetInputField
            label="예상 비용"
            value={cost}
            onChange={(e) => handleCostChange(e)}
            placeholder="0"
            type="text"
            suffix="원"
            error={!!costError}
            helperText={costError}
            centerAlign // ✅ 가운데 정렬 적용
          />
        )}
      </div>

      {/* Toast 메시지 출력 */}
      <div className="fixed bottom-29 w-full flex justify-center">
        <ToastMsg active={showToast} description={toastMessage} />
      </div>

      {/* 다음 버튼 */}
      <div
        className="fixed bottom-0 w-full px-7 flex justify-center pb-6"
        onClick={handleSubmit}
      >
        <SubmitBtn active={isFormValid()} description="다음" />
      </div>
    </div>
  );
}
