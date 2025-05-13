import { create } from "zustand";
import { chatType } from "../types/chatTypes";

interface ChatState {
  messages: chatType[];
  lastChatId: number | null;
  hasMore: boolean;
  isLoading: boolean;
  addMessage: (message: chatType) => void;
  addMessages: (messages: chatType[]) => void;
  clearMessages: () => void;
}

/**
 * 채팅 상태와 관련 액션을 관리하는 Zustand 스토어
 * @author 희진
 */
export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  lastChatId: null,
  hasMore: true,
  isLoading: false,

  /**
   * 새 메시지를 추가하는 함수
   * @param message 추가할 메시지 객체
   */
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  addMessages: (messages) =>
    set((state) => ({
      messages: [...messages, ...state.messages],
    })),

  clearMessages: () => set({ messages: [] }),
}));
