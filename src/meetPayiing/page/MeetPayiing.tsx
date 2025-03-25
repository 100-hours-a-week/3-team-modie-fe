import { useState, useEffect } from "react";
import cn from "../../utils/cn.ts";
import MeetInputField from "../../common/components/MeetInputField.tsx";
import SubmitBtn from "../../common/components/SubmitBtn.tsx";
import Header from "../../common/components/Header.tsx";
import { updateAmountService } from "../services/updateAmountService.ts";
import { useMeetStore } from "../../meetDetail/store/getMeetStore.ts";
import { useToast } from "../../common/hooks/useToastMsg.tsx";

export default function MeetPayiing() {
  // 상태 관리: 숫자 값과 표시용 포맷팅된 값 구분
  const [cost, setCost] = useState<string>("");
  const [formattedCost, setFormattedCost] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const { meetId } = useMeetStore();
  const { showToast } = useToast();

  // 최대 금액 설정 (10,000,000원)
  const MAX_AMOUNT = 10000000;

  // 입력값 처리 함수: 숫자만 추출하여 저장하고 최대값 검증
  const handleCostChange = (value: string) => {
    // 숫자와 콤마만 허용하고 콤마 제거
    const numericValue = value.replace(/[^0-9,]/g, "").replace(/,/g, "");

    // 최대값 검증
    const numericAmount = parseInt(numericValue) || 0;

    if (numericAmount > MAX_AMOUNT) {
      setError(
        `정산 금액은 ${formatCurrency(MAX_AMOUNT.toString())}원을 초과할 수 없습니다.`
      );
      setIsValid(false);
      // 최대 금액으로 제한
      setCost(MAX_AMOUNT.toString());
    } else {
      setError("");
      setIsValid(true);
      setCost(numericValue);
    }
  };

  // 입력값 변경 시 포맷팅된 값 업데이트
  useEffect(() => {
    setFormattedCost(cost ? formatCurrency(cost) : "");
  }, [cost]);

  // 저장 버튼 클릭 처리
  const handleSave = () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      showToast("로그인을 해주세요");
    }
    const costNum = parseInt(cost) || 0;

    if (!isValid) {
      return; // 유효하지 않은 경우 저장 방지
    }

    if (costNum > 0 && meetId && token && formatCurrency(cost)) {
      alert(`정산 금액 ${formatCurrency(cost)}원이 저장되었습니다.`);
      updateAmountService(meetId, token, Number(formatCurrency(cost)));
      // 실제 구현 시: navigate('/meet-detail');
    } else {
      alert("비용 없는 모임으로 처리됩니다.");
      // 실제 구현 시: navigate('/meet-detail');
    }
  };

  // 화폐 형식 변환 함수 - 간결하게 개선
  const formatCurrency = (value: string): string => {
    if (!value) return "";
    return Number(value).toLocaleString();
  };

  return (
    <div
      className={cn(
        "flex flex-col w-screen h-screen bg-white",
        "justify-between items-center px-[2rem]"
      )}
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
        className="fixed bottom-0 w-full px-7 flex justify-center pb-6"
        onClick={isValid ? handleSave : undefined}
      >
        <SubmitBtn active={isValid} description="다음" />
      </div>
    </div>
  );
}
