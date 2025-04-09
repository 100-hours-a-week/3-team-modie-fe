import { create } from "zustand";
import { chatType } from "../types/chatTypes";
import axiosInstance from "../../__api__/axiosConfig.ts";
import { handleError } from "../../__sentry__/useErrorHandler.ts";

interface ChatState {
  messages: chatType[];
  lastChatId: number | null;
  hasMore: boolean;
  isLoading: boolean;
  fetchMessages: (meetId: string, token: string) => void;
  fetchMoreMessages: (meetId: string, token: string) => Promise<boolean>;
  addMessage: (message: chatType) => void;
  clearMessages: () => void;
}

/**
 * 채팅 상태와 관련 액션을 관리하는 Zustand 스토어
 * @author 희진
 */
export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  lastChatId: null,
  hasMore: true,
  isLoading: false,

  /**
   * 미팅 ID에 해당하는 이전 채팅 메시지를 가져오는 함수
   * @param meetId 미팅 ID
   */
  fetchMessages: async (meetId: string, token: string) => {
    try {
      set({ messages: [], isLoading: true, lastChatId: null, hasMore: true }); // 기존 메시지 초기화

      const response = await axiosInstance.get(`/api/v1/chat/${meetId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data;

      if (data.length > 0) {
        const sortedMessages = [...data].reverse();
        // 마지막 메시지의 ID 저장 (가장 오래된 메시지)
        const oldestMessage = data[data.length - 1];
        set({
          messages: sortedMessages,
          lastChatId: oldestMessage.chatId,
          hasMore: data.length >= 25, // 25개 미만이면 더 이상 없다고 가정
        });
      } else {
        set({ messages: [], hasMore: false });
      }

      set({ isLoading: false });
    } catch (e) {
      // Sentry.captureException(e);
      handleError(e, {
        type: "chat",
        page: "chat",
        extra: { lastMeetId: meetId },
      });
      set({ isLoading: false, hasMore: false });
    }
  },

  /**
   * 이전 메시지를 더 가져오는 함수 (무한 스크롤용)
   * @param meetId 미팅 ID
   * @param token JWT 토큰
   * @returns 성공 여부
   */
  fetchMoreMessages: async (meetId: string, token: string) => {
    const { lastChatId, isLoading, hasMore } = get();

    if (isLoading || !hasMore || lastChatId === null) {
      return false;
    }

    try {
      set({ isLoading: true });

      const response = await axiosInstance.get(
        `/api/v1/chat/${meetId}?lastChatId=${lastChatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;

      if (data.length > 0) {
        // 기존 메시지 앞에 새로 가져온 메시지 추가
        const sortedMessages = [...data].reverse();
        const oldestMessage = data[data.length - 1];

        set((state) => ({
          messages: [...sortedMessages, ...state.messages],
          lastChatId: oldestMessage.chatId,
          hasMore: data.length >= 25, // 25개 미만이면 더 이상 없다고 가정
          isLoading: false,
        }));

        return true;
      } else {
        set({ hasMore: false, isLoading: false });
        return false;
      }
    } catch (e) {
      // Sentry.captureException(e);
      handleError(e, {
        type: "chat",
        page: "chat",
        extra: { lastMeetId: meetId },
      });
      set({ isLoading: false });
      return false;
    }
  },

  /**
   * 새 메시지를 추가하는 함수
   * @param message 추가할 메시지 객체
   */
  addMessage: (message: chatType) => {
    set((state) => {
      const updatedMessages = [...state.messages, message];
      return { messages: updatedMessages };
    });
  },

  /**
   * 메시지 목록을 초기화하는 함수
   * 채팅방을 나갈 때나 새로운 채팅방에 입장할 때 사용
   */
  clearMessages: () => {
    set({ messages: [], lastChatId: null, hasMore: true });
  },
}));
