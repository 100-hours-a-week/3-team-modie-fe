import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cn from "../../utils/cn.ts";
import MeetInputField from "../../common/components/MeetInputField.tsx";
import SubmitBtn from "../../common/components/SubmitBtn.tsx";
import Header from "../../common/components/Header.tsx";
import CopyIcon from "../../assets/copy.svg";
import { useMeetPaying } from "../hooks/useMeetPaying.tsx";
import { useMeetStore } from "../../meetDetail/store/getMeetStore.ts";
import axiosInstance from "../../__api__/axiosConfig.ts";

export default function MeetPaying() {
  const navigate = useNavigate();
  const { formattedCost, error, isValid, handleCostChange, handleSave } =
    useMeetPaying();

  const { meetId } = useMeetStore();
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [memberCount, setMemberCount] = useState(0);
  const [copied, setCopied] = useState(false); // copied 상태 추가

  useEffect(() => {
    if (!meetId) return;

    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/login");
    }

    const fetchPaymentInfo = async () => {
      try {
        await axiosInstance
          .get(`/api/v1/meets/${meetId}/payments`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            const { bankName, accountNumber, memberCount } = res.data.data;

            setBankName(bankName);
            setAccountNumber(accountNumber);
            setMemberCount(memberCount);
          });
      } catch (error) {
        console.error("정산 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchPaymentInfo();
  }, [meetId, navigate]);

  const handleCopy = () => {
    const textToCopy =
      bankName && accountNumber
        ? `${bankName} ${accountNumber} / ${
            formattedCost && memberCount > 0
              ? `${Math.round(
                  parseInt(formattedCost.replace(/,/g, ""), 10) / memberCount
                ).toLocaleString()}원`
              : ""
          }`
        : "";

    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopied(true); // 복사 완료 상태로 변경
          setTimeout(() => setCopied(false), 2000); // 2초 후 메시지 숨김
        })
        .catch((err) => {
          console.error("복사 실패:", err);
        });
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col w-screen h-screen bg-white",
        "justify-between items-center px-[2rem]"
      )}
    >
      <Header title="모임 정산" />

      <div className="self-stretch flex-1 pt-[2rem] pb-[21rem] flex flex-col justify-center items-center gap-[5rem]">
        <div
          className={cn(
            "w-full max-w-[33.5rem] text-center",
            "text-gray42 text-Title font-bold"
          )}
        >
          정산 금액을 입력해주세요
        </div>

        <div className="w-full max-w-[30rem] flex flex-col justify-center items-start gap-[1.2rem]">
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
            <div className="w-full h-6">
              {error && (
                <div className="text-activeRed text-Caption2">{error}</div>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col relative [&>div.mb-6]:mb-[3px]">
            <MeetInputField
              label="입금 정보"
              value={
                bankName && accountNumber
                  ? `${bankName} ${accountNumber} / ${
                      formattedCost && memberCount > 0
                        ? `${Math.round(
                            parseInt(formattedCost.replace(/,/g, ""), 10) /
                              memberCount
                          ).toLocaleString()}원`
                        : "정산 금액을 입력하세요"
                    }`
                  : "계좌 정보를 불러오는 중..."
              }
              readOnly
              centerAlign
            />

            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={handleCopy} // 클릭 이벤트를 handler 함수로 대체
            >
              <img src={CopyIcon} alt="복사" className="w-5 h-5" />
            </button>

            {/* 복사 완료 메시지 */}
            {copied && (
              <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-green-500 text-sm">
                복사 완료!
              </div>
            )}
          </div>
        </div>

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

      <div
        className="fixed bottom-0 w-full px-7 flex justify-center pb-6"
        onClick={isValid ? handleSave : undefined}
      >
        <SubmitBtn active={isValid} description="저장하기" />
      </div>
    </div>
  );
}
