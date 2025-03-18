// src/features/meet/hooks/useMeetData.ts
import { useState, useEffect } from "react";
import { meetItem } from "../types/meetItem";
import meetResponse from "../types/meetResponse";

// 더미 데이터 - 실제로는 별도 파일로 분리하거나 API로 가져오는 것이 좋습니다
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

// 훅의 반환 타입 정의
interface UseMeetDataReturn {
  meets: meetItem[];
  activeTab: string;
  selectedChip: string;
  chipCategories: string[];
  handleTabClick: (tab: string) => void;
  handleChipClick: (category: string) => void;
}

export const useMeetData = (): UseMeetDataReturn => {
  const [activeTab, setActiveTab] = useState("참여중");
  const [selectedChip, setSelectedChip] = useState("전체");
  const [meets, setMeets] = useState<meetItem[]>([]);

  // 카테고리 목록
  const chipCategories = ["전체", "음식", "운동", "이동", "기타"];

  useEffect(() => {
    console.log(`필터링 : ${activeTab} / ${selectedChip}`);
    /*
     * API 호출
     * 전체일 경우 빈 값으로, 다른 경우는 모두 param으로 전송하기 => 이건 목록조회 API 개발하는 사람이랑 얘기해보기
     */
    setMeets(dummyData.data.meets);
  }, [activeTab, selectedChip]);

  // 탭 클릭 핸들러
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // 칩 클릭 핸들러
  const handleChipClick = (category: string) => {
    setSelectedChip(category);
  };

  return {
    meets,
    activeTab,
    selectedChip,
    chipCategories,
    handleTabClick,
    handleChipClick,
  };
};
