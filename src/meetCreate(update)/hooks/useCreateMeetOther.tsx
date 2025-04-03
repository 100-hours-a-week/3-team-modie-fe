import { useState, useEffect } from "react";
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
  const { meetInfo, setMeetInfo, editMeetInfo } = useCreateMeetStore();

  // 저장된 데이터 또는 편집 모드 데이터를 초기값으로 사용
  const [dateInput, setDateInput] = useState(
    meetInfo.date || editMeetInfo?.date || today.format("YYYY.MM.DD") || ""
  );
  const [time, setTime] = useState(
    meetInfo.time?.hour && meetInfo.time?.minute
      ? meetInfo.time
      : editMeetInfo?.time || { hour: "", minute: "" }
  );
  const [memberCount, setMemberCount] = useState(
    meetInfo.memberCount
      ? meetInfo.memberCount.toString()
      : editMeetInfo?.memberCount
        ? editMeetInfo.memberCount.toString()
        : ""
  );
  const [hasCost, setHasCost] = useState(
    meetInfo.hasCost !== undefined
      ? meetInfo.hasCost
      : editMeetInfo?.hasCost || false
  );
  const [cost, setCost] = useState(
    meetInfo.cost
      ? meetInfo.cost.toLocaleString()
      : editMeetInfo?.cost
        ? editMeetInfo.cost.toLocaleString()
        : ""
  );

  const [dateError, setDateError] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    meetInfo.date
      ? dayjs(meetInfo.date, "YYYY.MM.DD").toDate()
      : editMeetInfo?.date
        ? dayjs(editMeetInfo.date, "YYYY.MM.DD").toDate()
        : today.toDate()
  );
  const [memberError, setMemberError] = useState("");
  const [costError, setCostError] = useState<string | undefined>(undefined);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // 편집 모드 또는 저장된 데이터로 초기화
  useEffect(() => {
    if (editMeetInfo) {
      setDateInput(editMeetInfo.date || "");
      setTime(editMeetInfo.time || { hour: "", minute: "" });
      setMemberCount(editMeetInfo.memberCount?.toString() || "");
      setHasCost(editMeetInfo.hasCost || false);
      setCost(editMeetInfo.cost ? editMeetInfo.cost.toLocaleString() : "");

      if (editMeetInfo.date) {
        const parsedDate = dayjs(editMeetInfo.date, "YYYY.MM.DD").toDate();
        setSelectedDate(parsedDate);
      }
    } else if (meetInfo) {
      // 편집 모드가 아니지만 세션 스토리지에 저장된 데이터가 있는 경우
      if (meetInfo.date) {
        setDateInput(meetInfo.date);
        // 날짜 유효성 검사
        if (validateDate(meetInfo.date)) {
          setSelectedDate(dayjs(meetInfo.date, "YYYY.MM.DD").toDate());
          setDateError("");
        }
      }

      if (meetInfo.time?.hour && meetInfo.time?.minute) {
        setTime(meetInfo.time);
      }

      if (meetInfo.memberCount) {
        setMemberCount(meetInfo.memberCount.toString());
        // 회원수 유효성 검사
        const num = meetInfo.memberCount;
        if (num < 2) {
          setMemberError("최소 인원은 2명입니다.");
        } else if (num > 30) {
          setMemberError("최대 인원은 30명입니다.");
        } else if (
          meetInfo.currentMember &&
          meetInfo.currentMember > 1 &&
          num < meetInfo.currentMember
        ) {
          setMemberError(
            "현재 참여 중인 인원보다 적은 인원으로 수정할 수 없습니다."
          );
        } else {
          setMemberError("");
        }
      }

      if (meetInfo.hasCost !== undefined) {
        setHasCost(meetInfo.hasCost);
      }

      if (meetInfo.cost) {
        setCost(meetInfo.cost.toLocaleString());
        // 비용 유효성 검사
        const num = meetInfo.cost;
        if (num < 1000) {
          setCostError("최소 금액은 1,000원입니다.");
        } else if (num > 10000000) {
          setCostError("최대 금액은 10,000,000원입니다.");
        } else {
          setCostError("");
        }
      }
    }
  }, []);

  // 값이 변경될 때마다 스토어에 저장
  useEffect(() => {
    if (dateInput && validateDate(dateInput)) {
      setMeetInfo({ date: dateInput });
    }
  }, [dateInput, setMeetInfo]);

  useEffect(() => {
    if (time.hour && time.minute) {
      setMeetInfo({ time });
    }
  }, [time, setMeetInfo]);

  useEffect(() => {
    if (memberCount) {
      const num = parseInt(memberCount, 10);
      if (!isNaN(num) && num >= 2 && num <= 30) {
        setMeetInfo({ memberCount: num });
      }
    }
  }, [memberCount, setMeetInfo]);

  useEffect(() => {
    setMeetInfo({ hasCost });
  }, [hasCost, setMeetInfo]);

  useEffect(() => {
    if (hasCost && cost) {
      const num = parseInt(cost.replace(/,/g, ""), 10);
      if (!isNaN(num) && num >= 1000 && num <= 10000000) {
        setMeetInfo({ cost: num });
      }
    } else if (!hasCost) {
      setMeetInfo({ cost: 0 });
    }
  }, [cost, hasCost, setMeetInfo]);

  const handleTimePickerOpen = () => setShowTimePicker(true);
  const handleTimeSave = (selected: { hour: string; minute: string }) => {
    setTime(selected);
    setShowTimePicker(false);
  };

  const validateDate = (value: string): boolean => {
    const formatRegex = /^\d{4}\.\d{2}\.\d{2}$/;
    const parsed = dayjs(value, "YYYY.MM.DD", true);

    return (
      formatRegex.test(value) &&
      parsed.isValid() &&
      !parsed.isBefore(today, "day") &&
      !parsed.isAfter(maxDate, "day")
    );
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

    if (!validateDate(val)) {
      setDateError("올바르지 않은 날짜 형식입니다.");
      setSelectedDate(null);
    } else {
      setDateError("");
      setSelectedDate(dayjs(val, "YYYY.MM.DD").toDate());
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
    const onlyNumbers = value.replace(/\D/g, "");
    const num = parseInt(onlyNumbers, 10);

    if (!onlyNumbers) {
      setMemberCount("");
      setMemberError("모집 인원을 입력해 주세요.");
      return;
    }

    if (num < 2) {
      setMemberError("최소 인원은 2명입니다.");
    } else if (num > 30) {
      setMemberError("최대 인원은 30명입니다.");
    } else if (
      editMeetInfo?.currentMember &&
      editMeetInfo.currentMember > 1 &&
      num < editMeetInfo.currentMember
    ) {
      setMemberError(
        "현재 참여 중인 인원보다 적은 인원으로 수정할 수 없습니다."
      );
    } else {
      setMemberError("");
    }

    setMemberCount(num.toString());
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
    const memberCountNum = Number(memberCount);
    const costNum = Number(cost.replace(/,/g, ""));

    const isMemberValid =
      memberCountNum >= 2 &&
      memberCountNum <= 30 &&
      !(
        editMeetInfo?.currentMember &&
        editMeetInfo.currentMember > 1 &&
        memberCountNum < editMeetInfo.currentMember
      );

    const isCostValid = !hasCost || (costNum >= 1000 && costNum <= 10000000);

    const isDateValid = selectedDate
      ? validateDate(dayjs(selectedDate).format("YYYY.MM.DD"))
      : false;

    const isToday = dayjs(dateInput).isSame(today, "day");
    const nowHour = today.hour();
    const nowMinute = today.minute();
    const selectedHour = Number(time.hour);
    const selectedMinute = Number(time.minute);
    const isPastTime =
      isToday &&
      (selectedHour < nowHour ||
        (selectedHour === nowHour && selectedMinute <= nowMinute));

    const isTimeValid = !isPastTime;

    return Boolean(
      dateInput &&
        isDateValid &&
        time.hour &&
        time.minute &&
        isTimeValid &&
        memberCount &&
        isMemberValid &&
        isCostValid
    );
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      if (!dateInput) return triggerToast("날짜를 입력해 주세요");
      if (!time.hour || !time.minute)
        return triggerToast("모임 시간을 입력해 주세요");
      if (!memberCount) return triggerToast("모집 인원을 입력해 주세요");
      if (hasCost && !cost) return triggerToast("예상 비용을 입력해 주세요");

      // meetAt 값 추가 (날짜 + 시간)
      const meetAt = `${dateInput} ${time.hour}:${time.minute}`;

      setMeetInfo({
        date: dateInput,
        time,
        memberCount: Number(memberCount),
        hasCost,
        cost: hasCost ? Number(cost.replace(/,/g, "")) : 0,
        meetAt,
      });

      navigate("/meet/create/last");
    }
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
