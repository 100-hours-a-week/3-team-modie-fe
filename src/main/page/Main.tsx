import { useEffect, useState } from "react";
import Header from "../../common/components/Header";
import MeetCard from "../components/MeetCard.tsx";
import MeetTap from "../components/MeetTab.tsx";
import MeetChip from "../components/MeetChip.tsx";
import CreateButton from "../components/CreateButton.tsx";
import { useMeetData } from "../hooks/useMeetData.tsx";
import { useCreateMeetStore } from "../../meetCreate(update)/store/useCreateMeetStore.ts";

export default function Main() {
  const [activeTab, setActiveTab] = useState("참여중");
  const [selectedChip, setSelectedChip] = useState("전체");

  const { meets, fetchNextPage, hasNextPage, isFetchingNextPage } = useMeetData(
    activeTab,
    selectedChip
  );

  /*
   * 모임 생성 상태 초기화를 위한 코드
   */
  useEffect(() => {
    const { resetMeetInfo } = useCreateMeetStore.getState();
    resetMeetInfo();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // 스크롤이 바닥에 가까워지면 다음 페이지 요청
      if (
        scrollTop + windowHeight >= fullHeight - 50 &&
        !isFetchingNextPage &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, isFetchingNextPage, hasNextPage]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10 bg-white">
        <Header isMainPage />

        {/* 탭 */}
        <div className="flex w-full h-fit justify-between">
          <MeetTap
            title="참여중"
            isSelected={activeTab === "참여중"}
            onClick={() => setActiveTab("참여중")}
          />
          <MeetTap
            title="종료"
            isSelected={activeTab === "종료"}
            onClick={() => setActiveTab("종료")}
          />
        </div>

        {/* 칩 */}
        <div
          className="flex flex-nowrap overflow-x-auto px-[2rem] py-[1.2rem] gap-4 w-full h-fit"
          style={{
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {["전체", "음식", "운동", "이동", "기타"].map((category) => (
            <MeetChip
              key={category}
              title={category}
              isSelected={selectedChip === category}
              onClick={() => setSelectedChip(category)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col px-[2rem] py-[1rem] gap-[2rem]">
        {meets.map((meet) => (
          <MeetCard
            key={meet.meetId}
            meetId={meet.meetId}
            meetIntro={meet.meetIntro}
            meetType={meet.meetType}
            meetAt={meet.meetAt}
            address={meet.address}
            addressDescription={meet.addressDescription}
            cost={meet.cost}
            memberCount={meet.memberCount}
            memberLimit={meet.memberLimit}
            ownerName={meet.ownerName}
          />
        ))}
      </div>
      <CreateButton />
    </div>
  );
}
