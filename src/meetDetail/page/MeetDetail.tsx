import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMeetStore } from "../hooks/useMeetStore";
import Header from "../../common/components/Header";
import ToastMsg from "../../common/components/ToastMsg";
import SubmitBtn from "../../common/components/SubmitBtn";
import clockIcon from "../../assets/clock.svg";
import costIcon from "../../assets/cost.svg";
import memberIcon from "../../assets/member.svg";
import copyIcon from "../../assets/copy.svg";
import InfoItem from "../components/InfoItem";
import KakaoMap from "../components/KakaoMap";
import { QRCodeCanvas } from "qrcode.react";
import Toggle from "../components/Toggle";
import { formatDate } from "../../utils/formatDate";
import { useToast } from "../../common/hooks/useToastMsg";
import { useSubmitButton } from "../../common/hooks/useSubmitBtn";

export default function MeetDetail() {
  const { meetId } = useParams();
  const { meet, fetchMeet } = useMeetStore();
  const navigate = useNavigate();

  const { toastMessage, isToastVisible, showToast } = useToast();

  const {
    active: submitActive,
    description: submitDescription,
    isVisible: isSubmitVisible,
  } = useSubmitButton(meet);

  useEffect(() => {
    if (meetId) {
      fetchMeet(Number(meetId));
    }
  }, [meetId, fetchMeet]);

  if (!meet) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>로딩 중...</p>
      </div>
    );
  }

  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => showToast("URL이 클립보드에 복사되었습니다!"))
      .catch(() => showToast("복사에 실패했습니다."));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title={meet.meetType} meetStatus={meet} />

      <main className="flex-1 flex flex-col items-center px-5 py-6 pt-[10px]">
        <hr />

        <div className="text-left w-full pt-6 pb-5">
          <div className="text-Body1 font-bold break-words w-full max-w-full leading-snug">
            {meet.meetIntro}
          </div>
          <div className="text-Body2 text-gray75">{meet.ownerName}</div>
        </div>

        <hr />

        <div className="flex justify-center w-full py-6 px-4">
          <button
            className="border-1 border-[#828282] w-full rounded-lg py-3 text-Body2"
            onClick={() =>
              navigate("/chat/:meetId", {
                state: {
                  id: meet.meetId,
                  type: meet.meetType,
                  isEnd: meet.completedAt,
                },
              })
            }
          >
            채팅방 입장하기
          </button>
        </div>

        <hr />

        <div className="w-full py-6">
          <div className="text-Body1 font-bold mb-2">상세설명</div>
          <InfoItem
            icon={clockIcon}
            title="시   간"
            content={
              meet.updatedAt
                ? `${formatDate(meet.meetDt)} (수정됨)`
                : formatDate(meet.meetDt)
            }
          />
          <InfoItem
            icon={costIcon}
            title="비용이 발생해요 !"
            content={`예상 비용 ${meet.totalCost.toLocaleString()}원`}
          />
          <InfoItem
            icon={memberIcon}
            title="인   원"
            content={`${meet.members.length} / ${meet.memberLimit}`}
          />
        </div>

        <hr />

        <div className="w-full py-6">
          <div className="text-Body1 font-bold mb-2">모임 장소</div>
          <KakaoMap address={meet.address} />
          <div className="mt-4 text-Body2 text-gray42 font-bold break-words whitespace-pre-wrap w-full">
            {meet.address}
          </div>
          <p className="mt-4 text-Body2 text-gray75 break-words whitespace-pre-wrap w-full">
            {meet.addressDetail}
          </p>
        </div>

        {/* 공유 정보는 guest가 아닐 때만 표시 */}
        {meet.meetRule !== "guest" && (
          <>
            <hr />
            <div className="w-full py-6">
              <div className="text-Body1 font-bold mb-2">공유 정보</div>
              <div className="flex items-center justify-center mt-4">
                <QRCodeCanvas value={window.location.href} size={184} />
              </div>
              <div className="w-full flex items-center gap-4 mt-4">
                <div className="text-Body2 font-bold shrink-0">URL</div>
                <div className="text-Body2 text-gray75 break-all">
                  {window.location.href}
                </div>
                <div className="ml-auto">
                  <img
                    src={copyIcon}
                    alt="copy"
                    className="cursor-pointer"
                    onClick={handleCopyUrl}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <hr />

        <div
          className={`w-full pt-6 ${meet.meetRule == "guest" ? "pb-30" : "pb-6"}`}
        >
          <div className="text-Body1 font-bold mb-2">모임 멤버</div>
          <ul className="list-disc">
            {meet.members.map((member) => (
              <li
                key={member.userId}
                className="flex justify-between items-center w-full text-Body2 text-gray75 pt-4"
              >
                <span className="break-words whitespace-pre-wrap max-w-[60%]">
                  {member.name}
                </span>

                {meet.meetRule === "owner" && (
                  <Toggle
                    initial={member.payed}
                    onChange={(checked) => {
                      // 서버로 PATCH 등 전송
                      console.log("정산 상태 변경됨:", checked);
                    }}
                  />
                )}

                {meet.meetRule === "member" && member.payed && (
                  <span className="text-Body2 font-semibold text-primary">
                    정산 완료
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <div className="fixed bottom-29 w-full flex justify-center">
        <ToastMsg active={isToastVisible} description={toastMessage} />
      </div>

      {isSubmitVisible && (
        <div className="fixed bottom-0 w-full px-7 flex justify-center pb-6">
          <SubmitBtn active={submitActive} description={submitDescription} />
        </div>
      )}
    </div>
  );
}
