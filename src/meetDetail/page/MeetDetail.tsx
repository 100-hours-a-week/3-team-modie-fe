import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMeetStore } from "../hooks/useMeetStore";
import Header from "../../common/components/Header";
import ToastMsg from "../../common/components/ToastMsg";
import SubmitBtn from "../../common/components/SubmitBtn";

export default function MeetDetail() {
  const { meetId } = useParams(); // URL에서 meetId 가져오기
  const { meet, fetchMeet } = useMeetStore();

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
      <main className="flex-1 flex flex-col items-center p-4">
        <h2 className="text-Title font-bold">{meet.meetIntro}</h2>
        <p className="text-gray-600">{meet.meetType}</p>
        <p className="text-gray-500">{meet.address}</p>
        <p className="text-gray-500">{meet.addressDetail}</p>
        <p className="text-gray-700">
          총 비용: {meet.totalCost.toLocaleString()}원
        </p>
        <h3 className="text-Title2 font-semibold mt-4">멤버</h3>
        <ul className="list-disc">
          {meet.members.map((member) => (
            <li key={member.userId} className="text-gray-700">
              {member.name} - {member.payed ? "결제 완료" : "미결제"}
            </li>
          ))}
        </ul>
      </main>

      <div className="flex justify-center mt-auto mb-29">
        <ToastMsg active={true} description="토스트 메세지 컴포넌트" />
      </div>

      <div className="fixed bottom-0 w-full flex justify-center pb-6">
        <SubmitBtn active={true} description="다음" />
      </div>
    </div>
  );
}
