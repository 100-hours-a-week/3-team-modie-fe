import Header from "../../common/components/Header";
import MeetCard from "../components/MeetCard.tsx";
import MeetTap from "../components/MeetTab.tsx";
import MeetChip from "../components/MeetChip.tsx";
import CreateButton from "../components/CreateButton.tsx";
import { useMeetData } from "../hooks/useMeetData.tsx";

export default function Main() {
  const {
    meets,
    activeTab,
    selectedChip,
    chipCategories,
    handleTabClick,
    handleChipClick,
  } = useMeetData();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10 bg-white">
        <Header isMainPage />

        {/* 탭 */}
        <div className="flex w-full h-fit justify-between">
          <MeetTap
            title="참여중"
            isSelected={activeTab === "참여중"}
            onClick={() => handleTabClick("참여중")}
          />
          <MeetTap
            title="종료"
            isSelected={activeTab === "종료"}
            onClick={() => handleTabClick("종료")}
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
          {chipCategories.map((category) => (
            <MeetChip
              key={category}
              title={category}
              isSelected={selectedChip === category}
              onClick={() => handleChipClick(category)}
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
            addressDetail={meet.addressDetail}
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
