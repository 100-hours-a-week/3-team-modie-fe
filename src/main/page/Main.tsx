// import TestUserComponent from "../components/TestUserComponent";
import Header from "../../common/components/Header";
import MeetCard from "../components/MeetCard.tsx";
import MeetTap from "../components/MeetTab.tsx";
import MeetChip from "../components/MeetChip.tsx";
import { useEffect, useState } from "react";
// import {useQuery} from "@tanstack/react-query";

export default function Main() {
  const [activeTab, setActiveTab] = useState("참여중");
  const [selectedChip, setSelectedChip] = useState("전체");
  const chipCategories = ["전체", "음식", "운동", "이동", "기타"];

  useEffect(() => {
    console.log(`필터링 : ${activeTab} / ${selectedChip}`);
  }, [activeTab, selectedChip]);

  const handleChipClick = (category: string) => {
    setSelectedChip(category);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* tanstack-query 테스트용도
      <TestUserComponent /> */}
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
        <div className="flex px-[2rem] py-[1.2rem] gap-4 w-full h-fit justify-between">
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
        <MeetCard meetKey={1} />
        <MeetCard meetKey={2} />
        <MeetCard meetKey={3} />
        <MeetCard meetKey={3} />
        <MeetCard meetKey={3} />
        <MeetCard meetKey={3} />
        <MeetCard meetKey={3} />
        <MeetCard meetKey={3} />
      </div>
    </div>
  );
}
