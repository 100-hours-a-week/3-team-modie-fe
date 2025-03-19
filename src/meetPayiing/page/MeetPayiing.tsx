import { useState, useEffect } from "react";
import cn from "../../utils/cn.ts";
import MeetInputField from "../../common/components/MeetInputField.tsx";
import SubmitBtn from "../../common/components/SubmitBtn.tsx";
import Header from "../../common/components/Header.tsx";

export default function MeetCost() {
  // 상태 관리: 숫자 값과 표시용 포맷팅된 값 구분
  const [cost, setCost] = useState<string>("");
  const [formattedCost, setFormattedCost] = useState<string>("");

  // 입력값 처리 함수: 숫자만 추출하여 저장
  const handleCostChange = (value: string) => {
    // 숫자와 콤마만 허용하고 콤마 제거
    const numericValue = value.replace(/[^0-9,]/g, "").replace(/,/g, "");
    setCost(numericValue);
  };

  // 입력값 변경 시 포맷팅된 값 업데이트
  useEffect(() => {
    setFormattedCost(cost ? formatCurrency(cost) : "");
  }, [cost]);

  // 저장 버튼 클릭 처리
  const handleSave = () => {
    const costNum = parseInt(cost) || 0;

    if (costNum > 0) {
      alert(`정산 금액 ${formatCurrency(cost)}원이 저장되었습니다.`);
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
      <Header />

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
        <div className="w-full max-w-[33.5rem] flex flex-col justify-center items-start gap-[1.2rem]">
          <MeetInputField
            label=""
            value={formattedCost}
            onChange={handleCostChange}
            placeholder="0"
            type="text"
            suffix="원"
            centerAlign
          />
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

      {/* 저장 버튼 - 이벤트 핸들러 위치 변경 */}
      <div
        className="fixed bottom-0 w-full px-7 flex justify-center pb-6"
        onClick={handleSave}
      >
        <SubmitBtn active={true} description="다음" />
      </div>
    </div>
  );
}
