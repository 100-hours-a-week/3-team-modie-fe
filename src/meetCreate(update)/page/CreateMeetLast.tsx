import { useEffect } from "react";
import Header from "../../common/components/Header";
import ProgressBar from "../../common/components/ProgressBar";
import KakaoMap from "../../meetDetail/components/KakaoMap";
import { useMeetStore } from "../../meetDetail/hooks/useMeetStore";
import CategoryBox from "../components/CategoryBox";
import moveIcon from "../../assets/move.svg";
import { formatDate } from "../../utils/formatDate";
import MemberIcon from "../../assets/member.svg?react";

export default function CreateMeetLast() {
  const { meet, fetchMeet } = useMeetStore();

  useEffect(() => {
    fetchMeet(1); // 필요한 meetId 값 넣으세요
  }, [fetchMeet]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header title="최종 확인" />
      <ProgressBar width={100} />

      <main className="flex-1 px-6 pb-[12rem] mt-5">
        <div className="mb-15 px-6 mt-6 text-Body1 font-bold block text-left">
          모임 설정을 확인해주세요.
        </div>

        <div className="text-left w-full pt-6 pb-5">
          <div>
            <CategoryBox
              icon={moveIcon}
              label="이동"
              onClick={(label) => console.log(`Category clicked: ${label}`)}
            />
          </div>
          <div>
            <div className="text-Body1 font-bold mb-2">모임 장소</div>
            <div className="text-Body1 text-gray42">
              {formatDate(meet?.meetAt ?? null)}
            </div>
            <div className="text-Body1 text-gray42">
              {formatDate(meet?.meetAt ?? null)}
            </div>
            <div className="text-Body1 font-bold mb-2">
              <MemberIcon className="text-black" />
              <div className="text-Body3 text-gray75">{meet?.memberLimit}</div>
            </div>
          </div>
        </div>

        <div className="w-full py-6">
          <div className="text-Body1 font-bold mb-2">모임 장소</div>
          <KakaoMap address={meet?.address ?? ""} />
          <div className="mt-4 text-Body2 text-gray42 font-bold break-words whitespace-pre-wrap w-full">
            {meet?.address}
          </div>
          <p className="mt-4 text-Body2 text-gray75 break-words whitespace-pre-wrap w-full">
            {meet?.addressDetail}
          </p>
        </div>

        <div className="w-full py-6">
          <div className="text-Body1 font-bold mb-2">모임 소개글</div>
          <p className="mt-4 text-Body2 text-gray75 break-words whitespace-pre-wrap w-full">
            {meet?.meetIntro}
          </p>
        </div>

        <div className="w-full py-6">
          <div className="text-Body1 font-bold mb-2">비용이 발생해요</div>
          <p className="mt-4 text-Body2 text-gray75 break-words whitespace-pre-wrap w-full">
            예상 비용 {meet?.totalCost.toLocaleString()}원
          </p>
        </div>
      </main>
    </div>
  );
}
