// import TestUserComponent from "../components/TestUserComponent";
import Header from "../../common/components/Header";
import MeetCard from "../components/MeetCard.tsx";
import MeetTap from "../components/MeetTab.tsx";
import MeetChip from "../components/MeetChip.tsx";
import meetResponse from "../types/meetResponse.ts";
import { useEffect, useState } from "react";
import { meetItem } from "../types/meetItem.tsx";
import CreateButton from "../components/CreateButton.tsx";
// import {useQuery} from "@tanstack/react-query";

export default function Main() {
  const [activeTab, setActiveTab] = useState("참여중");
  const [selectedChip, setSelectedChip] = useState("전체");
  const chipCategories = ["전체", "음식", "운동", "이동", "기타"];
  const [meets, setMeets] = useState<meetItem[]>([]);

  // 더미 데이터
  const dummyData: meetResponse = {
    success: true,
    data: {
      page: 1,
      size: 10,
      totalElements: 47,
      meets: [
        {
          meetId: 1,
          meetIntro: "제주 올레길 탐방",
          meetType: "여행",
          meetAt: "2025-03-20T10:00:00",
          address: "제주특별자치도 제주시 월성로 4길 19",
          addressDetail: "노블레스호텔 정문",
          cost: true,
          memberCount: 2,
          memberLimit: 3,
          ownerName: "김박박즐",
        },
        {
          meetId: 2,
          meetIntro: "한라산 등반 함께해요",
          meetType: "운동",
          meetAt: "2025-03-22T08:00:00",
          address: "제주특별자치도 제주시 아라동",
          addressDetail: "한라산 입구 주차장",
          cost: false,
          memberCount: 3,
          memberLimit: 5,
          ownerName: "등산마스터",
        },
        {
          meetId: 3,
          meetIntro: "제주 흑돼지 맛집 투어",
          meetType: "음식",
          meetAt: "2025-03-21T18:30:00",
          address: "제주특별자치도 서귀포시 색달동",
          addressDetail: "제주맛집 앞",
          cost: true,
          memberCount: 6,
          memberLimit: 6,
          ownerName: "맛집헌터",
        },
        {
          meetId: 4,
          meetIntro: "공항에서 서귀포 택시 쉐어",
          meetType: "이동",
          meetAt: "2025-03-10T14:00:00",
          address: "제주특별자치도 제주시 공항로",
          addressDetail: "제주국제공항 1번 출구",
          cost: true,
          memberCount: 2,
          memberLimit: 4,
          ownerName: "여행객123",
        },
        {
          meetId: 5,
          meetIntro: "우도 자전거 투어",
          meetType: "기타",
          meetAt: "2025-03-23T09:00:00",
          address: "제주특별자치도 제주시 우도면",
          addressDetail: "우도 선착장",
          cost: false,
          memberCount: 3,
          memberLimit: 8,
          ownerName: "섬여행가",
        },
      ],
    },
  };

  useEffect(() => {
    // API 데이터 가져오기
    // 실제로는 여기서 fetch나 axios 등으로 API 호출
    setMeets(dummyData.data.meets);
  }, []);

  useEffect(() => {
    console.log(`필터링 : ${activeTab} / ${selectedChip}`);
    // 실제로는 여기서 필터링된 API 호출 또는 로컬 데이터 필터링
    const filteredMeets = dummyData.data.meets.filter((meet) => {
      if (selectedChip !== "전체" && meet.meetType !== selectedChip) {
        return false;
      }
      // activeTab에 따른 필터링도 추가할 수 있음
      return true;
    });
    setMeets(filteredMeets);
  }, [activeTab, selectedChip]);

  const handleChipClick = (category: string) => {
    setSelectedChip(category);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

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
        <div className="flex flex-nowrap overflow-x-auto scrollbar-hide px-[2rem] py-[1.2rem] gap-4 w-full h-fit">
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
