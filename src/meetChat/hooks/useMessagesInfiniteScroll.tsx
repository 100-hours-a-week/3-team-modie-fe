import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessagesService } from "../services/getMessagesService";
import { getMoreMessageService } from "../services/getMoreMessagesService";
import { chatType } from "../types/chatTypes";

interface PageData {
  messages: chatType[];
  nextCursor: number | null;
}

export const useMessagesInfiniteScroll = (meetId: string | null) => {
  const token = localStorage.getItem("accessToken") || "";

  return useInfiniteQuery<
    PageData, // TQueryFnData (응답 타입)
    Error, // TError
    PageData, // TData (사용 컴포넌트에서 받게 될 타입)
    [string, string], // TQueryKey
    number | null // TPageParam
  >({
    queryKey: ["chatMessages", meetId ?? ""],
    initialPageParam: null,
    queryFn: async ({ pageParam = null }) => {
      if (!meetId) throw new Error("meetId is required");
      if (!token) throw new Error("token is missing");

      console.log("pageParam 값:", pageParam);

      // 초기 요청 or 이전 메시지 불러오기
      const response =
        pageParam === null
          ? await getMessagesService(meetId, token)
          : await getMoreMessageService(meetId, pageParam, token);

      const data = response.data;

      // 데이터가 없는 경우 처리
      if (!data || data.length === 0) {
        return {
          messages: [],
          nextCursor: null, // 더 이상 불러올 데이터가 없음
        };
      }

      // 데이터가 있는 경우 처리
      const sortedMessages = [...data].reverse(); // 시간순 정렬
      console.log("받은 메시지 개수:", data.length);

      return {
        messages: sortedMessages,
        // messages: data,
        nextCursor: data.length > 0 ? data[data.length - 1].chatId : null, // 가장 오래된 메시지 기준 커서 설정
      };
    },
    getNextPageParam: (lastPage) => {
      // lastPage가 undefined이거나 nextCursor가 null인 경우 처리
      if (
        !lastPage ||
        lastPage.nextCursor === null ||
        lastPage.messages.length === 0
      ) {
        return undefined; // 더 이상 데이터를 불러오지 않음
      }
      return lastPage.nextCursor;
    },
    enabled: !!meetId && !!token,
    refetchOnWindowFocus: false,
    // staleTime: 1000 * 60 * 5,
  });
};
