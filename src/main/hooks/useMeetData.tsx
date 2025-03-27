import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { meetItem } from "../types/meetItem";
import { getMeetsService } from "../services/getMeetsService";

export const useMeetData = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("참여중");
  const [selectedChip, setSelectedChip] = useState("전체");
  const [meets, setMeets] = useState<meetItem[]>([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const chipCategories = ["전체", "음식", "운동", "이동", "기타"];

  const fetchMeets = async (pageNum: number) => {
    setIsFetching(true);
    try {
      const res = await getMeetsService({
        category: selectedChip === "기타" ? "전체" : selectedChip,
        completed: activeTab === "종료",
        page: pageNum,
        token: localStorage.getItem("accessToken")!,
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

        const now = new Date();
        filteredMeets = filteredMeets.filter((meet) =>
          activeTab === "종료"
            ? new Date(meet.meetAt) < now
            : new Date(meet.meetAt) >= now
        );

        setMeets((prev) =>
          pageNum === 1 ? filteredMeets : [...prev, ...filteredMeets]
        );
        setHasNextPage(res.data.size * pageNum < res.data.totalElements);
      }
    } catch (error) {
      console.error("모임 목록 조회 실패:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) navigate("/login");
    else {
      setPage(page);
      setHasNextPage(true);
      fetchMeets(page);
    }
  }, [activeTab, selectedChip]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;

      if (bottom && !isFetching && hasNextPage) {
        setPage((prevPage) => {
          const nextPage = prevPage + 1;
          fetchMeets(nextPage);
          return nextPage;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, hasNextPage]);

  return {
    meets,
    activeTab,
    selectedChip,
    chipCategories,
    handleTabClick: setActiveTab,
    handleChipClick: setSelectedChip,
  };
};
