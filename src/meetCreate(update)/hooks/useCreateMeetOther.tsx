import { useState } from "react";
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

  const [dateInput, setDateInput] = useState(meetInfo.date || "");
  const [time, setTime] = useState(meetInfo.time || { hour: "", minute: "" });
  const [memberCount, setMemberCount] = useState(
    meetInfo.memberCount ? meetInfo.memberCount.toString() : ""
  );
  const [hasCost, setHasCost] = useState(meetInfo.hasCost || false);
  const [cost, setCost] = useState(
    meetInfo.cost ? meetInfo.cost.toLocaleString() : ""
  );

  const [dateError, setDateError] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [memberError, setMemberError] = useState("");
  const [costError, setCostError] = useState<string | undefined>(undefined);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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

  const handleDateInputChange = (value: string) => {
    let val = value.replace(/\D/g, "");

    if (val.length <= 4) {
      // 그대로
    } else if (val.length <= 6) {
      val = `${val.slice(0, 4)}.${val.slice(4)}`;
    } else {
      val = `${val.slice(0, 4)}.${val.slice(4, 6)}.${val.slice(6)}`;
    }

    setDateInput(val);

    if (validateDate(val)) {
      setSelectedDate(dayjs(val, "YYYY.MM.DD").toDate());
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
    return Boolean(
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
