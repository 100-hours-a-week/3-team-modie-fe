import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { meetItem } from "../types/meetItem";
import { getMeetsService } from "../services/getMeetsService";

interface UseMeetDataReturn {
  meets: meetItem[];
  activeTab: string;
  selectedChip: string;
  chipCategories: string[];
  handleTabClick: (tab: string) => void;
  handleChipClick: (category: string) => void;
}

export const useMeetData = (): UseMeetDataReturn => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("참여중");
  const [selectedChip, setSelectedChip] = useState("전체");
  const [meets, setMeets] = useState<meetItem[]>([]);

  const chipCategories = ["전체", "음식", "운동", "이동", "기타"];

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/login");
    }

    if (token) {
      const fetchMeets = async () => {
        try {
          const res = await getMeetsService({
            category: selectedChip == "기타" ? "전체" : selectedChip,
            completed: activeTab === "종료",
            page: 1, // TODO: 추후 무한스크롤 구현하면서 변경하기
            token,
          });

          if (res.data.meets) {
            let filteredMeets = res.data.meets;

            if (selectedChip !== "전체") {
              if (selectedChip === "기타") {
                const basicCategories = ["음식", "운동", "이동"];
                filteredMeets = filteredMeets.filter(
                  (meet) => !basicCategories.includes(meet.meetType)
                );
              } else {
                filteredMeets = filteredMeets.filter(
                  (meet) => meet.meetType === selectedChip
                );
              }
            }

            // 종료된 모임 필터링
            const now = new Date();
            if (activeTab === "종료") {
              filteredMeets = filteredMeets.filter(
                (meet) => new Date(meet.meetAt) < now
              );
            } else {
              filteredMeets = filteredMeets.filter(
                (meet) => new Date(meet.meetAt) >= now
              );
            }

            setMeets(filteredMeets);
          }
        } catch (error) {
          console.error("모임 목록 조회 실패:", error);
        }
      };
      fetchMeets();
    }
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
