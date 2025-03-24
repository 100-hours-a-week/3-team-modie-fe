import Header from "../../common/components/Header";
import MessageBox from "../components/MessageBox";
import ChatInput from "../components/chatInput";
import { useEffect, useRef, useState } from "react";
import { formatChatDate, formatChatTime } from "../../utils/formatChatDate";
import { getChatMessageMeta } from "../../utils/getChatMessageMeta";
import { useChatStore } from "../hooks/useChat";
import { useLocation } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import { chatType } from "../types/chatTypes";

export default function MeetChat() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, fetchMessages, addMessage } = useChatStore();
  const location = useLocation();
  const { id, type, isEnd } = location.state || {};
  const CHAT_INPUT_HEIGHT = "10rem";
  const [stompClient, setStompClient] = useState<Client | null>(null);

  // 웹소켓 연결 설정
  useEffect(() => {
    // 초기 메시지 로드
    fetchMessages(id);
    if (isEnd) console.log("");

    // JWT 토큰 가져오기
    const jwtToken = localStorage.getItem("accessToken");

    // STOMP 클라이언트 생성
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      connectHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },
      onConnect: () => {
        console.log("웹소켓 연결 성공");

        // 해당 미팅 채팅방 구독
        client.subscribe(`/topic/chat/${id}`, (message) => {
          try {
            const receivedMessage = JSON.parse(message.body);

            // 메시지를 useChatStore 형식으로 변환
            const chatMessage: chatType = {
              nickname: receivedMessage.userName,
              isMe: false,
              isOwner: false,
              content: receivedMessage.messageContent,
              dateTime: receivedMessage.createdAt,
            };

            // 스토어에 메시지 추가
            addMessage(chatMessage);

            // 새 메시지 도착 시 스크롤
            scrollToBottom();
          } catch (error) {
            console.error("메시지 처리 중 오류:", error);
          }
        });
      },
      onStompError: (frame) => {
        console.error("STOMP 에러:", frame.headers, frame.body);
      },
    });

    // 연결 시작
    client.activate();
    setStompClient(client);

    // 컴포넌트 언마운트 시 연결 종료
    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, [id, fetchMessages, addMessage]);

  // 스크롤 함수 분리
  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (msg: string) => {
    if (!msg.trim() || !stompClient || !stompClient.connected) return;

    try {
      // JWT 토큰 가져오기
      const jwtToken = localStorage.getItem("accessToken");

      // 웹소켓을 통해 메시지 전송 (content만 전송)
      stompClient.publish({
        destination: `/app/chat/${id}`,
        body: msg,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      console.log(`/chat/${id} : msg`);

      // UI에 메시지 표시
      const myMessage: chatType = {
        nickname: "나",
        isMe: true,
        isOwner: true,
        content: msg,
        dateTime: new Date().toISOString(),
      };

      // 스토어에 메시지 추가
      addMessage(myMessage);

      // 전송 후 스크롤
      scrollToBottom();
    } catch (error) {
      console.error("메시지 전송 중 오류:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title={type || "아직!"} />

      <main
        className="flex-1 overflow-y-auto px-5 mt-3"
        style={{ paddingBottom: CHAT_INPUT_HEIGHT }}
      >
        {messages.map((msg, index) => {
          const prev = messages[index - 1];
          const { currentDate, showDate, showNickname } = getChatMessageMeta(
            msg,
            prev
          );

          if (currentDate) console.log(currentDate);

          return (
            <div key={index} className="flex flex-col gap-1">
              {showDate && (
                <div className="text-Body1 font-bold text-center mt-4 mb-1">
                  {formatChatDate(msg.dateTime)}
                </div>
              )}
              <MessageBox
                nickname={msg.nickname}
                isMe={msg.isMe}
                isOwner={msg.isOwner}
                content={msg.content}
                date={formatChatDate(msg.dateTime)}
                time={formatChatTime(msg.dateTime)}
                showNickname={showNickname}
              />
            </div>
          );
        })}
        <div ref={scrollRef} />
      </main>

      <ChatInput
        // isDisabled={!!isEnd || !stompClient?.connected}
        isDisabled={false}
        onSend={handleSendMessage}
        onFocusInput={scrollToBottom}
      />
    </div>
  );
}
