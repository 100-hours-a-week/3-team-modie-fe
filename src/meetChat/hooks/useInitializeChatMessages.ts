import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { chatType } from "../types/chatTypes";

/**
 * data가 바뀔 때마다 메시지를 정리해서 Zustand에 저장 + 스크롤 이동 커스텀 훅입니다.
 * @author 희진
 */

interface ChatPage {
  messages: chatType[];
}

interface UseInitChatMessagesParams {
  data: { pages: (ChatPage | undefined)[] } | undefined;
  isLoading: boolean;
  isFirstLoadFinished: boolean;
  setIsFirstLoadFinished: (v: boolean) => void;
  scrollToBottom: () => void;
}

export function useInitializeChatMessages({
  data,
  isLoading,
  isFirstLoadFinished,
  setIsFirstLoadFinished,
  scrollToBottom,
}: UseInitChatMessagesParams) {
  const { addMessages, clearMessages } = useChatStore();

  useEffect(() => {
    if (!data) return;

    try {
      const allMessages = data.pages.flatMap((page) => page?.messages || []);

      const uniqueMessages = [
        ...new Map(allMessages.map((msg) => [msg.chatId, msg])).values(),
      ].sort((a, b) => a.chatId - b.chatId);

      clearMessages();
      addMessages(uniqueMessages);

      if (!isFirstLoadFinished && !isLoading && uniqueMessages.length > 0) {
        setTimeout(() => {
          scrollToBottom();
          setIsFirstLoadFinished(true);
        }, 100);
      }
    } catch (error) {
      console.error("메시지 처리 중 오류:", error);
    }
  }, [data, isLoading]);
}
