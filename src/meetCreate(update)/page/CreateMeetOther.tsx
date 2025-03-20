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

export default function CreateMeetOther() {
  const {
    dateInput,
    dateError,
    showCalendar,
    setShowCalendar,
    selectedDate,
    handleDateInputChange,
    handleCalendarDateChange,
    time,
    showTimePicker,
    setShowTimePicker,
    handleTimePickerOpen,
    handleTimeSave,
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
