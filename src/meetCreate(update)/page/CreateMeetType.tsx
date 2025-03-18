import Header from "../../common/components/Header";
import ToastMsg from "../../common/components/ToastMsg";
import SubmitBtn from "../../common/components/SubmitBtn";
import moveIcon from "../../assets/move.svg";
import foodIcon from "../../assets/food.svg";
import workoutIcon from "../../assets/workout.svg";
import etcIcon from "../../assets/etc.svg";
import CategoryBox from "../components/CategoryBox";
import { useMeetCreate1 } from "../hooks/useMeetCreate1";
import ProgressBar from "../../common/components/ProgressBar";

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
  } = useMeetCreate1();

  return (
    <div className="flex flex-col min-h-screen bg-white">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7 px-16 justify-items-center items-center">
            <CategoryBox
              icon={moveIcon}
              label="이동"
              isActive={selectedCategory === "이동"}
              onClick={handleCategoryClick}
            />
            <CategoryBox
              icon={foodIcon}
              label="음식"
              isActive={selectedCategory === "음식"}
              onClick={handleCategoryClick}
            />
            <CategoryBox
              icon={workoutIcon}
              label="운동"
              isActive={selectedCategory === "운동"}
              onClick={handleCategoryClick}
            />
            <CategoryBox
              icon={etcIcon}
              label="기타"
              isActive={selectedCategory === "기타"}
              onClick={handleCategoryClick}
            />
          </div>
        </div>

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

      <div className="fixed bottom-29 w-full flex justify-center z-50">
        <ToastMsg active={isToastVisible} description={toastMessage} />
      </div>

      <div className="fixed bottom-0 w-full px-7 flex justify-center pb-6">
        <div onClick={handleSubmit} className="w-full">
          <SubmitBtn active={isValid} description="다음" />
        </div>
      </div>
    </div>
  );
}
