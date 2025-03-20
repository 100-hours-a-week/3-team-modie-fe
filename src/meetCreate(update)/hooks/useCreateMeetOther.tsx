import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useCreateMeetStore } from "../store/useCreateMeetStore";

/**
 * 모임 생성 페이지 3단계 커스텀 훅
 * @author 희진
 */

export const useMeetCreateOther = () => {
  const today = dayjs();
  const maxDate = today.add(1, "year");

  const navigate = useNavigate();
  const { meetInfo, setMeetInfo } = useCreateMeetStore();

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

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (meetInfo.date) setDateInput(meetInfo.date);
    if (meetInfo.time) setTime(meetInfo.time);
    if (meetInfo.memberCount) setMemberCount(meetInfo.memberCount.toString());
    if (meetInfo.hasCost) setHasCost(meetInfo.hasCost);
    if (meetInfo.cost) setCost(meetInfo.cost.toLocaleString());
  }, [
    meetInfo.date,
    meetInfo.time,
    meetInfo.memberCount,
    meetInfo.hasCost,
    meetInfo.cost,
  ]);

  const handleTimePickerOpen = () => setShowTimePicker(true);
  const handleTimeSave = (selected: { hour: string; minute: string }) => {
    setTime(selected);
    setShowTimePicker(false);
  };

  const validateDate = (value: string) => {
    const formatRegex = /^\d{4}\.\d{2}\.\d{2}$/;
    const parsed = dayjs(value, "YYYY.MM.DD", true);
    if (!formatRegex.test(value) || !parsed.isValid()) {
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
    let value = e.target.value.replace(/\D/g, "");

    if (value.length <= 4) {
      // 그냥 아무 포맷도 하지 않고 그대로 사용
    } else if (value.length <= 6) {
      value = `${value.slice(0, 4)}.${value.slice(4)}`;
    } else {
      value = `${value.slice(0, 4)}.${value.slice(4, 6)}.${value.slice(6)}`;
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
    setShowCalendar(false);
  };

  const handleMemberChange = (value: string) => {
    const num = parseInt(value.replace(/\D/g, ""), 10);
    setMemberCount(num.toString());
    if (num < 1) setMemberError("최소 인원은 1명입니다.");
    else if (num > 30) setMemberError("최대 인원은 30명입니다.");
    else setMemberError("");
  };

  const handleCostChange = (value: string) => {
    const raw = value.replace(/,/g, "").replace(/\D/g, "");
    const num = parseInt(raw, 10);
    const formatted = raw ? Number(raw).toLocaleString() : "";
    setCost(formatted);

    if (raw === "") setCostError("");
    else if (num < 1000) setCostError("최소 금액은 1,000원입니다.");
    else if (num > 10000000) setCostError("최대 금액은 10,000,000원입니다.");
    else setCostError("");
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const isFormValid = () => {
    return (
      dateInput && time.hour && time.minute && memberCount && (!hasCost || cost)
    );
  };

  const handleSubmit = () => {
    if (!dateInput) return triggerToast("날짜를 입력해 주세요");
    if (!time.hour || !time.minute)
      return triggerToast("모임 시간을 입력해 주세요");
    if (!memberCount) return triggerToast("모집 인원을 입력해 주세요");
    if (hasCost && !cost) return triggerToast("예상 비용을 입력해 주세요");

    setMeetInfo({
      date: dateInput,
      time,
      memberCount: Number(memberCount),
      hasCost,
      cost: hasCost ? Number(cost.replace(/,/g, "")) : 0,
    });

    navigate("/meet/create/last");
  };

  return {
    // Datepicker 관련
    dateInput,
    setDateInput,
    dateError,
    showCalendar,
    setShowCalendar,
    selectedDate,
    handleDateInputChange,
    handleCalendarDateChange,

    // Timepicker 관련
    time,
    showTimePicker,
    setShowTimePicker,
    handleTimePickerOpen,
    handleTimeSave,

    // 모임 관련
    memberCount,
    handleMemberChange,
    memberError,
    hasCost,
    setHasCost,
    cost,
    handleCostChange,
    costError,
    isFormValid,
    handleSubmit,
    showToast,
    toastMessage,
    today,
    maxDate,
  };
};
