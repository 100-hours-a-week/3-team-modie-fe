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

export default function MeetDetail() {
  const { meetId } = useParams(); // URL에서 meetId 가져오기
  const { meet, fetchMeet } = useMeetStore();

  const navigate = useNavigate();

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

  return (
    <div className="flex flex-col min-h-screen">
      <Header title={meet.meetIntro} meetStatus={meet} />
      <main className="flex-1 flex flex-col items-center px-5 py-6 pt-[14px] ">
        <div className="text-left w-full border-t-1  border-t-gray9e pt-6 pb-5">
          <div className="text-Body1 font-bold">{meet.meetIntro}</div>
          <div className="text-Body2 text-gray75">{meet.ownerName}</div>
        </div>

        <div className="flex justify-center w-full border-t-1 border-t-gray2 py-6 px-4">
          <button
            className="border-1 border-[#828282] w-full rounded-lg py-3 text-Body2"
            onClick={() => {
              navigate("/chat/:meetId");
            }}
          >
            채팅방 입장하기
          </button>
        </div>

        <div className="w-full border-t-1 border-t-gray2 py-6">
          <div className="text-Body1 font-bold mb-2">상세설명</div>
          <InfoItem icon={clockIcon} title="시   간" content={meet.meetDt} />
          <InfoItem
            icon={costIcon}
            title="비용이 발생해요 !"
            content={`예상 비용 ${meet.totalCost}원`}
          />
          <InfoItem
            icon={memberIcon}
            title="인   원"
            content={`${meet.members.length} / ${meet.memberLimit}`}
          />
        </div>

        <div className="w-full border-t-1 border-t-gray2 py-6">
          <div className="text-Body1 font-bold mb-2">모임 장소</div>
          <KakaoMap address={meet.address} />
          <div className="mt-4 text-Body2 text-gray42 font-bold">
            {meet.address}
          </div>
          <p className="mt-4 text-Body2 text-gray75">{meet.addressDetail}</p>
        </div>

        <div className="w-full border-t-1 border-t-gray2 py-6">
          <div className="text-Body1 font-bold mb-2">공유 정보</div>
          <div className="flex items-center justify-center mt-4">
            <QRCodeCanvas value={window.location.href} size={184} />
          </div>
          <div className="w-full flex items-center gap-2 mt-4">
            <div className="text-Body2 font-bold shrink-0">URL</div>
            <div className="text-Body2 text-gray75 truncate">
              {window.location.href}
            </div>
            <div className="ml-auto">
              <img src={copyIcon} alt="copy" className="cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="w-full border-t-1 border-t-gray2 pt-6 pb-30">
          <div className="text-Body1 font-bold mb-2">모임 멤버</div>

          <ul className="list-disc">
            {meet.members.map((member) => (
              <li
                key={member.userId}
                className="flex justify-between items-center w-full text-Body2 text-gray75 pt-4"
              >
                {member.name}
                <Toggle initial={member.payed} />
              </li>
            ))}
          </ul>
        </div>
      </main>

      <div className="fixed bottom-29 w-full flex justify-center ">
        <ToastMsg active={false} description="토스트 메세지 컴포넌트" />
      </div>

      <div className="fixed bottom-0 w-full flex justify-center pb-6">
        <SubmitBtn active={true} description="다음" />
      </div>
    </div>
  );
}
