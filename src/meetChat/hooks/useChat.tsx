import { create } from "zustand";
import { chatType } from "../types/chatTypes";
import axiosInstance from "../../__api__/axiosConfig.ts";

interface ChatState {
  messages: chatType[];
  fetchMessages: (meetId: number, token: string) => void;
  addMessage: (message: chatType) => void;
  clearMessages: () => void;
}

/**
 * 채팅 상태와 관련 액션을 관리하는 Zustand 스토어
 * @author 희진
 */
export const useChatStore = create<ChatState>((set) => ({
  messages: [],

  /**
   * 미팅 ID에 해당하는 이전 채팅 메시지를 가져오는 함수
   * @param meetId 미팅 ID
   */
  fetchMessages: async (meetId: number, token: string) => {
    try {
      const response = await axiosInstance.get(`/api/v1/chat/${meetId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 서버에서 받아온 메시지가 최신순이라면 역순으로 정렬
      const sortedMessages = [...response.data.data].reverse();
      set({ messages: sortedMessages });
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  },

  /**
   * 새 메시지를 추가하는 함수
   * @param message 추가할 메시지 객체
   */
  addMessage: (message: chatType) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  /**
   * 메시지 목록을 초기화하는 함수
   * 채팅방을 나갈 때나 새로운 채팅방에 입장할 때 사용
   */
  clearMessages: () => {
    set({ messages: [] });
  },
}));
