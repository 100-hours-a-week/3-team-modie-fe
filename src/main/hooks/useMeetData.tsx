import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getMeetsService } from "../services/getMeetsService";
import { meetItem } from "../types/meetItem";

export const useMeetData = (activeTab: string, selectedChip: string) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken") || "";
  const queryKey = ["meets", activeTab, selectedChip];

  if (!token) {
    navigate("/login");
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading, // TODO: 로딩시 화면에 로직 추가하기
    refetch,
    error,
  } = useInfiniteQuery({
    queryKey: queryKey,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getMeetsService({
        category: selectedChip,
        completed: activeTab === "종료",
        page: pageParam,
        token,
      });

      let meets = res.data.meets;

      if (selectedChip !== "전체") {
        if (selectedChip === "기타") {
          const basicCategories = ["음식", "운동", "이동"];
          meets = meets.filter(
            (meet) => !basicCategories.includes(meet.meetType)
          );
        } else {
          meets = meets.filter((meet) => meet.meetType === selectedChip);
        }
      }

      return {
        meets,
        nextPage: pageParam + 1,
        totalElements: res.data.totalElements,
        pageSize: res.data.size,
      };
    },

    getNextPageParam: (lastPage, pages) => {
      const loadedCount = pages.reduce(
        (acc, page) => acc + page.meets.length,
        0
      );

      return loadedCount < lastPage.totalElements
        ? lastPage.nextPage
        : undefined;
    },
    refetchOnWindowFocus: false,
  });

  const meetsFlat: meetItem[] = data?.pages.flatMap((page) => page.meets) || [];

  return {
    meets: meetsFlat,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    error,
  };
};
