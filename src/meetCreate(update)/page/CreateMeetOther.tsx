import { useEffect } from "react";
import Header from "../../common/components/Header";
import ProgressBar from "../../common/components/ProgressBar";
import CalendarIcon from "../../assets/calendar.svg";
import MeetInputField from "../components/MeetInputField";
import CostToggle from "../components/CostToggle";
import DatePicker from "../components/DatePicker";
import TimePicker from "../components/TimePicker";
import TimeDisplayField from "../components/TimeDisplayField";
import SubmitBtn from "../../common/components/SubmitBtn";
import ToastMsg from "../../common/components/ToastMsg";
import { useMeetCreateOther } from "../hooks/useCreateMeetOther";
// import { useCreateMeetStore } from "../store/useCreateMeetStore";
import dayjs from "dayjs";

import React from "react";
import type { ProfilerOnRenderCallback } from "react";

import { useMeetContext } from "../experiments/context/MeetCreateContext";
// import { useMeetStore } from "../experiments/jotai/MeetAtom";

// import { useSelector, useDispatch } from "react-redux";
// import {
//   setMeetInfo,
//   setEditMeetInfo,
//   setEditMode,
// } from "../experiments/redux/CreateMeetSlice";
// import type { RootState } from "../experiments/redux/CreateMeetSlice";

export default function CreateMeetOther() {
  const {
    // DatePicker 관련
    dateInput,
    dateError,
    showCalendar,
    setShowCalendar,
    selectedDate,
    handleDateInputChange,
    handleCalendarDateChange,

    // TimePicker 관련
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
  } = useMeetCreateOther();

  // const { meetInfo, setMeetInfo, isEditMode, editMeetInfo } =
  //   useCreateMeetStore();
  const { meetInfo, setMeetInfo, isEditMode, editMeetInfo } = useMeetContext();
  // const { meetInfo, setMeetInfo, isEditMode, editMeetInfo } = useMeetStore();

  // const dispatch = useDispatch();
  // const { meetInfo, isEditMode, editMeetInfo } = useSelector(
  //   (state: RootState) => state.meet
  // );

  useEffect(() => {
    if (isEditMode && editMeetInfo) {
      const dateStr = dayjs(editMeetInfo.date).format("YYYY.MM.DD");
      const timeObj = {
        hour: editMeetInfo.time.hour,
        minute: editMeetInfo.time.minute,
      };

      // meetAt 값도 함께 설정
      const meetAt = `${dateStr} ${timeObj.hour}:${timeObj.minute}`;

      setMeetInfo({
        ...meetInfo,
        date: dateStr,
        time: timeObj,
        memberCount: editMeetInfo.memberCount,
        hasCost: !!editMeetInfo.hasCost,
        cost: editMeetInfo.cost || 0,
        meetAt,
      });
    }
  }, [isEditMode, editMeetInfo]);

  // useEffect(() => {
  //   if (isEditMode && editMeetInfo) {
  //     const dateStr = dayjs(editMeetInfo.date).format("YYYY.MM.DD");
  //     const timeObj = {
  //       hour: editMeetInfo.time.hour,
  //       minute: editMeetInfo.time.minute,
  //     };
  //     const meetAt = `${dateStr} ${timeObj.hour}:${timeObj.minute}`;

  //     dispatch(
  //       setMeetInfo({
  //         ...meetInfo,
  //         date: dateStr,
  //         time: timeObj,
  //         memberCount: editMeetInfo.memberCount,
  //         hasCost: !!editMeetInfo.hasCost,
  //         cost: editMeetInfo.cost || 0,
  //         meetAt,
  //       })
  //     );
  //   }
  // }, [isEditMode, editMeetInfo]);

  const onRenderCallback: ProfilerOnRenderCallback = (
    id, // 방금 커밋된 Profiler 트리의 "id"
    phase, // "mount" (트리가 방금 마운트가 된 경우) 혹은 "update"(트리가 리렌더링된 경우)
    actualDuration, // 커밋된 업데이트를 렌더링하는데 걸린 시간
    baseDuration, // 메모이제이션 없이 하위 트리 전체를 렌더링하는데 걸리는 예상시간
    startTime, // React가 언제 해당 업데이트를 렌더링하기 시작했는지
    commitTime // React가 해당 업데이트를 언제 커밋했는지
  ) => {
    console.log(`
      [Profiler: ${id}]
        ▶ Phase: ${phase}
        ⏱️ Actual Duration: ${actualDuration.toFixed(2)}ms 
        🧱 Base Duration: ${baseDuration.toFixed(2)}ms 
        ⌚ Start Time: ${startTime.toFixed(2)}  
        ✅ Commit Time: ${commitTime.toFixed(2)}
      `);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-white">
      <Header title="기타 정보 작성" />
      <ProgressBar width={75} />

      <div className="px-6 mt-6">
        {/* 날짜 입력 */}
        <React.Profiler id="DateInput" onRender={onRenderCallback}>
          <MeetInputField
            label="날짜를 정해주세요."
            value={dateInput || dayjs().format("YYYY.MM.DD")}
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
        </React.Profiler>

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
        <React.Profiler id="TimeInput" onRender={onRenderCallback}>
          <TimeDisplayField
            label="모임 시간"
            hour={time.hour}
            minute={time.minute}
            onClick={handleTimePickerOpen}
          />
        </React.Profiler>
        {showTimePicker && (
          <div className="mt-1">
            <TimePicker
              onSave={handleTimeSave}
              onClose={() => setShowTimePicker(false)}
              selectedDate={selectedDate}
            />
          </div>
        )}

        {/* 모집 인원 */}
        <React.Profiler id="MemberInput" onRender={onRenderCallback}>
          <MeetInputField
            label="모집 인원"
            value={memberCount}
            onChange={(e) => handleMemberChange(e)}
            placeholder="2~30"
            type="text" // ✅ text로 변경
            suffix="명"
            error={!!memberError}
            helperText={memberError}
            centerAlign // ✅ 가운데 정렬 적용
          />
        </React.Profiler>

        {/* 비용 발생 여부 토글 */}
        <React.Profiler id="CostToggleInput" onRender={onRenderCallback}>
          <CostToggle hasCost={hasCost} setHasCost={setHasCost} />{" "}
        </React.Profiler>

        {/* 예상 비용 */}
        {hasCost && (
          <React.Profiler id="CostInput" onRender={onRenderCallback}>
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
          </React.Profiler>
        )}
      </div>

      {/* Toast 메시지 출력 */}
      <div className="absolute bottom-29 w-full flex justify-center z-[2000]">
        <ToastMsg active={showToast} description={toastMessage} />
      </div>

      {/* 다음 버튼 */}
      <div
        className="absolute bottom-0 w-full lex justify-center pb-6"
        onClick={handleSubmit}
      >
        <SubmitBtn active={isFormValid()} description="다음" />
      </div>
    </div>
  );
}
