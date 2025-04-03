import cn from "../../utils/cn.ts";
import MeetInputField from "../../common/components/MeetInputField.tsx";
import SubmitBtn from "../../common/components/SubmitBtn.tsx";
import Header from "../../common/components/Header.tsx";
import { useMeetPaying } from "../hooks/useMeetPaying.tsx";

export default function MeetPaying() {
  const { formattedCost, error, isValid, handleCostChange, handleSave } =
    useMeetPaying();

  return (
    <div
      className={cn("relative flex flex-col min-h-screen", "justify-between")}
    >
      <Header title="모임 정산" />

      {/* 콘텐츠 영역 */}
      <div className="self-stretch flex-1 pt-[2rem] pb-[21rem] flex flex-col justify-center items-center gap-[5rem]">
        {/* 정산 금액 입력 안내 텍스트 */}
        <div
          className={cn(
            "w-full max-w-[33.5rem] text-center",
            "text-gray42 text-Title font-bold"
          )}
        >
          정산 금액을 입력해주세요
        </div>

        {/* 정산 금액 입력 필드 */}
        <div className="w-full max-w-[30rem] flex flex-col justify-center items-start gap-[1.2rem]">
          {/*
              MEMO MeetInputField에 적용된 mb-6을 재정의하기 위한 스타일
                   모임 생성 페이지에서 가져온 MeetInputTag에 설정된 mb-6 스타일로 인해 발생하는 여백을 지우기 위함
                   MeetInputField 업데이트 후 style jsx 코드 지울 예정
            */}

          <div className="w-full flex flex-col [&>div.mb-6]:mb-[3px]">
            <MeetInputField
              label=""
              value={formattedCost}
              onChange={handleCostChange}
              placeholder="0"
              type="text"
              suffix="원"
              centerAlign
            />

            {/* 오류 메시지 표시 - 고정 높이를 가진 컨테이너 */}
            <div className="w-full h-6">
              {error && (
                <div className="text-activeRed text-Caption2">{error}</div>
              )}
            </div>
          </div>
        </div>

        {/* 안내 메시지 */}
        <div
          className={cn(
            "text-center",
            "text-gray42 text-Title font-pretendard"
          )}
        >
          <br />
          정산 내역은 멤버 목록에서
          <br />
          확인해주세요
        </div>
      </div>

      {/* 저장 버튼 - 유효성에 따라 활성화 상태 설정 */}
      <div
        className="absolute bottom-0 w-full flex justify-center pb-6"
        onClick={isValid ? handleSave : undefined}
      >
        <SubmitBtn active={isValid} description="저장하기" />
      </div>
    </div>
  );
}
