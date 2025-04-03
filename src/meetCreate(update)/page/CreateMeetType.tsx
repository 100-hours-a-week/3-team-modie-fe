import { useEffect } from "react";
import Header from "../../common/components/Header";
import ToastMsg from "../../common/components/ToastMsg";
import SubmitBtn from "../../common/components/SubmitBtn";
import moveIcon from "../../assets/move.svg";
import foodIcon from "../../assets/food.svg";
import workoutIcon from "../../assets/workout.svg";
import etcIcon from "../../assets/etc.svg";
import CategoryBox from "../components/CategoryBox";
import { useCreateMeetType } from "../hooks/useCreateMeetType";
import ProgressBar from "../../common/components/ProgressBar";
import { useCreateMeetStore } from "../store/useCreateMeetStore";

const CATEGORIES = [
  { id: "이동", icon: moveIcon, label: "이동" },
  { id: "음식", icon: foodIcon, label: "음식" },
  { id: "운동", icon: workoutIcon, label: "운동" },
  { id: "기타", icon: etcIcon, label: "기타" },
];

export default function CreateMeetType() {
  const {
    intro,
    setIntro,
    selectedCategory,
    handleCategoryClick,
    customType,
    setCustomType,
    isValid,
    handleSubmit,
    toastMessage,
    isToastVisible,
  } = useCreateMeetType();

  const { meetInfo, isEditMode, editMeetInfo, setMeetInfo } =
    useCreateMeetStore();

  useEffect(() => {
    if (isEditMode && editMeetInfo) {
      const categoryList = ["이동", "운동", "음식"];
      const isCustomCategory = !categoryList.includes(editMeetInfo.category);

      setMeetInfo({
        ...meetInfo,
        meetId: editMeetInfo.meetId,
        intro: editMeetInfo.intro,
        category: isCustomCategory ? "기타" : editMeetInfo.category,
        customType: isCustomCategory ? editMeetInfo.category : "",
      });
    }
  }, [isEditMode, editMeetInfo]);

  return (
    <div className="relative flex flex-col min-h-screen bg-white">
      <Header title="모임 유형 선택" />
      <ProgressBar width={25} />

      <div className="flex-1 px-6 pb-[12rem] mt-5">
        {/* 모임 소개글 */}
        <div className="mb-15">
          <div className="text-Body1 font-bold mb-5">모임 소개글</div>
          <input
            type="text"
            value={intro}
            onChange={(e) => {
              if (e.target.value.length <= 30) {
                setIntro(e.target.value);
              }
            }}
            placeholder="소개글을 입력해주세요."
            style={{ backgroundColor: "#f5f5f5" }}
            className="w-full rounded-md p-4 text-Body2 placeholder:text-grayBd focus:outline-none"
          />
        </div>

        {/* 모임 카테고리 */}
        <div className="mb-15">
          <div className="grid grid-cols-2 gap-7 px-16 justify-items-center items-center">
            {CATEGORIES.map(({ id, icon, label }) => (
              <CategoryBox
                key={id}
                icon={icon}
                label={label}
                isActive={selectedCategory === label}
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        </div>

        {/* 기타 선택 시 직접 입력 */}
        {selectedCategory === "기타" && (
          <div className="mt-6">
            <div className="text-Body1 font-semibold mb-5">직접 입력하기</div>
            <input
              type="text"
              value={customType}
              onChange={(e) => {
                if (e.target.value.length <= 10) {
                  setCustomType(e.target.value);
                }
              }}
              placeholder="모임 유형을 입력해주세요."
              style={{ backgroundColor: "#f5f5f5" }}
              className="w-full rounded-md p-4 text-Body2 placeholder:text-grayBd focus:outline-none"
            />
          </div>
        )}
      </div>
      <div className="absolute bottom-29 w-full flex justify-center z-50">
        <ToastMsg active={isToastVisible} description={toastMessage} />
      </div>

      <div className="absolute bottom-0 w-full flex justify-center pb-6">
        <div onClick={handleSubmit} className="w-full">
          <SubmitBtn active={isValid} description="다음" />
        </div>
      </div>
    </div>
  );
}
