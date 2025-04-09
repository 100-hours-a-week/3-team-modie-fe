import { useInfiniteQuery } from "@tanstack/react-query";
import { getMeetsService } from "../services/getMeetsService";
import { meetItem } from "../types/meetItem";
import { handleError } from "../../__sentry__/useErrorHandler";

export const useMeetData = (activeTab: string, selectedChip: string) => {
  const token = localStorage.getItem("accessToken") || "";
  const queryKey = ["meets", activeTab, selectedChip];

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    error,
  } = useInfiniteQuery({
    queryKey: queryKey,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      try {
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
      } catch (e) {
        handleError(e, {
          type: "meet-list",
          page: "meet-list",
          message: "카테고리에 해당하는 모임 목록 조회 실패",
          extra: {
            category: selectedChip,
            completed: activeTab === "종료",
            page: pageParam,
            token: token,
          },
        });
        throw e;
      }
    },

    getNextPageParam: (lastPage, pages) => {
      try {
        const loadedCount = pages.reduce(
          (acc, page) => acc + page.meets.length,
          0
        );
        return loadedCount < lastPage.totalElements
          ? lastPage.nextPage
          : undefined;
      } catch (e) {
        handleError(e, {
          type: "meet-list",
          page: "meet-list",
          message: "무한 스크롤 실패",
          extra: {
            pages: pages,
            lastPage: lastPage,
            totalElements: lastPage.totalElements,
          },
        });
        throw e;
      }
    },
    refetchOnWindowFocus: false,
  });

  const meetsFlat: meetItem[] =
    data?.pages.flatMap((page) => page?.meets) || [];

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
