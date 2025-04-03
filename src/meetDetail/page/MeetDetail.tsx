import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMeetStore } from "../store/getMeetStore";
import Header from "../../common/components/Header";
import ToastMsg from "../../common/components/ToastMsg";
import SubmitBtn from "../../common/components/SubmitBtn";
import ClockIcon from "../../assets/clock.svg?react";
import CostIcon from "../../assets/cost.svg?react";
import MemberIcon from "../../assets/member.svg?react";
import copyIcon from "../../assets/copy.svg";
import InfoItem from "../components/InfoItem";
import KakaoMap from "../components/KakaoMap";
import { QRCodeCanvas } from "qrcode.react";
import Toggle from "../components/Toggle";
import { formatDate } from "../../utils/formatDate";
import { useToast } from "../../common/hooks/useToastMsg";
import { useSubmitButton } from "../../common/hooks/useSubmitBtn";
import { useFetchMeet } from "../hooks/useMeetStore";
import { joinMeetService } from "../services/joinMeetService";
import { updatePaymentService } from "../services/updatePaymentService";
import { meetMembers } from "../../common/types/meetType";
import Splash from "../../common/page/Splash";

export default function MeetDetail() {
  const { meetId } = useParams();
  const { meet } = useMeetStore();
  const { fetchMeet } = useFetchMeet();
  const navigate = useNavigate();

  const { toastMessage, isToastVisible, showToast } = useToast();
  const isEnded = !!meet?.completedAt;

  const {
    active: submitActive,
    description: submitDescription,
    isVisible: isSubmitVisible,
  } = useSubmitButton(meet);

  useEffect(() => {
    if (meetId) {
      fetchMeet(meetId as string);
    }
  }, [meetId]);

  if (!meet) {
    return <Splash />;
  }

  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => showToast("URL이 클립보드에 복사되었습니다!"))
      .catch(() => showToast("복사에 실패했습니다."));
  };

  // 참여
  const handleJoinMeet = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      localStorage.setItem("afterLoginRedirect", window.location.pathname);
      showToast("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      const res = await joinMeetService(meetId as string, token);
      if (res.success) {
        showToast("모임에 참여했어요!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error: unknown) {
      let message = "참여에 실패했어요";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.data?.message || "참여에 실패했어요";
      }

      showToast(message);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      <Header title={meet.meetType} meetStatus={meet} canGoHome={true} />

      <main className="flex-1 flex flex-col items-center px-5 pb-6 ">
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
            className="border-1 border-[#828282] w-full rounded-lg py-3 text-Body2 cursor-pointer"
            onClick={() =>
              navigate(`/${meet.meetId}/chat`, {
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
            icon={<ClockIcon className="text-primaryDark3" />}
            title="시   간"
            content={
              meet.updatedAt
                ? `${formatDate(meet.meetAt)} (수정됨)`
                : formatDate(meet.meetAt)
                  ? `${formatDate(meet.meetAt)} (수정됨)`
                  : formatDate(meet.meetAt)
            }
          />
          {meet.totalCost > 0 && (
            <InfoItem
              icon={<CostIcon className="text-primaryDark3" />}
              title="비용이 발생해요 !"
              content={`예상 비용 ${meet.totalCost.toLocaleString()}원`}
            />
          )}

          <InfoItem
            icon={<MemberIcon className="text-primaryDark3" />}
            title="인   원"
            content={`${(meet.members ?? []).length + 1} / ${meet.memberLimit}`}
          />
        </div>

        <hr />

        <div className="w-full py-6">
          <div className="text-Body1 font-bold mb-2">모임 장소</div>
          {meet.address && <KakaoMap address={meet.address} />}
          <div className="mt-4 text-Body2 text-gray42 font-bold break-words whitespace-pre-wrap w-full">
            {meet.address}
          </div>
          <p className="mt-4 text-Body2 text-gray75 break-words whitespace-pre-wrap w-full">
            {meet.addressDescription}
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
            {meet.members?.map((member: meetMembers) => (
              <li
                key={member.userId}
                className="flex justify-between items-center w-full text-Body2 text-gray75 pt-4"
              >
                <span className="break-words whitespace-pre-wrap max-w-[60%]">
                  {member.userName}
                </span>

                {meet.meetRule === "owner" &&
                  meet.totalCost > 0 &&
                  !isEnded && (
                    <Toggle
                      initial={member.isPayed}
                      onChange={async () => {
                        const token = localStorage.getItem("accessToken");
                        if (!token) {
                          showToast("로그인이 필요합니다.");
                          navigate("/login");
                          return false;
                        }

                        try {
                          if (meet.meetId) {
                            await updatePaymentService(
                              meet.meetId ?? "",
                              token,
                              member.userId
                            );
                            return true;
                          } else {
                            showToast("올바르지 않은 요청입니다.");
                            return false;
                          }
                        } catch {
                          showToast("정산 상태 변경 실패");
                          return false;
                        }
                      }}
                    />
                  )}

                {(isEnded || meet.meetRule === "member") && member.isPayed && (
                  <span className="text-Body3 font-semibold text-activeBlue">
                    정산 완료
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <div className="absolute bottom-29 w-full flex justify-center">
        <ToastMsg active={isToastVisible} description={toastMessage} />
      </div>

      {isSubmitVisible && (
        <div
          className="absolute bottom-0 w-full px-7 flex justify-center pb-6"
          onClick={
            submitDescription === "모임 참여하기" ? handleJoinMeet : undefined
          }
        >
          <SubmitBtn active={submitActive} description={submitDescription} />
        </div>
      )}
    </div>
  );
}
