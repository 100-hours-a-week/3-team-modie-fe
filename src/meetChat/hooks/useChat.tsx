import { create } from "zustand";
import { chatType } from "../types/chatTypes";

interface ChatState {
  messages: chatType[];
  fetchMessages: (meetId: number) => void;
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
  fetchMessages: async () => {
    try {
      // TODO: 실제 API 연동 시 아래 주석 해제
      // const response = await axios.get(`/api/chat/${meetId}`);
      // set({ messages: response.data });

      // API 연동 전 더미데이터 (실제 구현 시 삭제)
      const dummyData: chatType[] = [
        {
          nickname: "지렁이",
          isMe: true,
          isOwner: true,
          content: "첫 인사",
          dateTime: "2025-03-10T12:00:00",
        },
        {
          nickname: "지렁이",
          isMe: true,
          isOwner: true,
          content: "안녕하세요!",
          dateTime: "2025-03-10T12:00:05",
        },
        {
          nickname: "우렁이",
          isMe: false,
          isOwner: false,
          content: "반가워요~",
          dateTime: "2025-02-24T15:02:00",
        },
        {
          nickname: "지렁이",
          isMe: true,
          isOwner: true,
          content: "요즘 잘 지내시나요?",
          dateTime: "2025-02-24T15:03:00",
        },
        {
          nickname: "우렁이",
          isMe: false,
          isOwner: false,
          content: "그럼요! 잘 지냅니다 😊",
          dateTime: "2025-02-24T15:04:00",
        },
        {
          nickname: "지렁이",
          isMe: true,
          isOwner: true,
          content: "이번 주말에 시간 괜찮으세요?",
          dateTime: "2025-02-24T15:05:00",
        },
        {
          nickname: "우렁이",
          isMe: false,
          isOwner: false,
          content: "주말은 바쁠 것 같아요 😢",
          dateTime: "2025-02-24T15:06:00",
        },
        {
          nickname: "지렁이",
          isMe: true,
          isOwner: true,
          content: "괜찮아요~ 다음에 또 봐요!",
          dateTime: "2025-02-24T15:07:00",
        },
        {
          nickname: "구렁이",
          isMe: false,
          isOwner: false,
          content: "저도 같이 가고 싶어요!",
          dateTime: "2025-02-25T09:00:00",
        },
        {
          nickname: "지렁이",
          isMe: true,
          isOwner: true,
          content: "좋아요! 다 같이 만나요~",
          dateTime: "2025-02-25T09:01:00",
        },
        {
          nickname: "구렁이",
          isMe: false,
          isOwner: false,
          content: "그럼 몇 시에 만날까요?",
          dateTime: "2025-02-25T09:02:00",
        },
        {
          nickname: "지렁이",
          isMe: true,
          isOwner: true,
          content: "12시쯤 어때요?",
          dateTime: "2025-02-25T09:03:00",
        },
        {
          nickname: "우렁이",
          isMe: false,
          isOwner: false,
          content: "좋아요~!",
          dateTime: "2025-02-25T09:04:00",
        },
        {
          nickname: "지렁이",
          isMe: true,
          isOwner: true,
          content: "장소는 카페 A에서 봐요 ☕️",
          dateTime: "2025-02-25T09:05:00",
        },
        {
          nickname: "구렁이",
          isMe: false,
          isOwner: false,
          content: "네~ 확인했습니다!",
          dateTime: "2025-02-25T09:06:00",
        },
        {
          nickname: "지렁이",
          isMe: true,
          isOwner: true,
          content: "다들 조심히 와요 🙌",
          dateTime: "2025-02-25T09:07:00",
        },
      ];

      // 더미 데이터로 상태 업데이트
      set({ messages: dummyData });
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
