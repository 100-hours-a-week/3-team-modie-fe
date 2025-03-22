import { create } from "zustand";
import { chatType } from "../types/chatTypes";

interface ChatState {
  messages: chatType[];
  fetchMessages: (meetId: number) => void;
}

/**
 * 채팅 엔드포인트에 요청을 보내는 커스텀 훅
 * @author 희진
 */

export const useChatStore = create<ChatState>((set) => ({
  messages: [],

  // 이렇게 수정해야 함
  // fetchMessages: async (meetId: number) => {
  fetchMessages: async () => {
    try {
      //   const response = await axios.get(`/채팅/엔드포인트`);

      // TODO: API 연동 전 더미데이터
      const dummyData: chatType[] = [
        {
          nickname: "지렁이",
          isMe: true,
          isOwner: true,
          content: "첫 인사",
          dateTime: "2025,02,24,15,00,00",
        },
        {
          nickname: "지렁이",
          isMe: true,
          isOwner: true,
          content: "안녕하세요!",
          dateTime: "2025,02,24,15,01,00",
        },
        {
          nickname: "우렁이",
          isMe: false,
          isOwner: false,
          content: "반가워요~",
          dateTime: "2025,02,24,15,02,00",
        },
        {
          nickname: "지렁이",
          isMe: true,
          isOwner: true,
          content: "요즘 잘 지내시나요?",
          dateTime: "2025,02,24,15,03,00",
        },
        {
          nickname: "우렁이",
          isMe: false,
          isOwner: false,
          content: "그럼요! 잘 지냅니다 😊",
          dateTime: "2025,02,24,15,04,00",
        },
        {
          nickname: "지렁이",
          isMe: true,
          isOwner: true,
          content: "이번 주말에 시간 괜찮으세요?",
          dateTime: "2025,02,24,15,05,00",
        },
        {
          nickname: "우렁이",
          isMe: false,
          isOwner: false,
          content: "주말은 바쁠 것 같아요 😢",
          dateTime: "2025,02,24,15,06,00",
        },
        {
          nickname: "지렁이",
          isMe: true,
          isOwner: true,
          content: "괜찮아요~ 다음에 또 봐요!",
          dateTime: "2025,02,24,15,07,00",
        },
        {
          nickname: "구렁이",
          isMe: false,
          isOwner: false,
          content: "저도 같이 가고 싶어요!",
          dateTime: "2025,02,25,09,00,00",
        },
        {
          nickname: "지렁이",
          isMe: true,
          isOwner: true,
          content: "좋아요! 다 같이 만나요~",
          dateTime: "2025,02,25,09,01,00",
        },
        {
          nickname: "구렁이",
          isMe: false,
          isOwner: false,
          content: "그럼 몇 시에 만날까요?",
          dateTime: "2025,02,25,09,02,00",
        },
        {
          nickname: "지렁이",
          isMe: true,
          isOwner: true,
          content: "12시쯤 어때요?",
          dateTime: "2025,02,25,09,03,00",
        },
        {
          nickname: "우렁이",
          isMe: false,
          isOwner: false,
          content: "좋아요~!",
          dateTime: "2025,02,25,09,04,00",
        },
        {
          nickname: "지렁이",
          isMe: true,
          isOwner: true,
          content: "장소는 카페 A에서 봐요 ☕️",
          dateTime: "2025,02,25,09,05,00",
        },
        {
          nickname: "구렁이",
          isMe: false,
          isOwner: false,
          content: "네~ 확인했습니다!",
          dateTime: "2025,02,25,09,06,00",
        },
        {
          nickname: "지렁이",
          isMe: true,
          isOwner: true,
          content: "다들 조심히 와요 🙌",
          dateTime: "2025,02,25,09,07,00",
        },
      ];

      set({ messages: dummyData }); // Zustand 상태 업데이트
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  },
}));
