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
  const [isConnected, setIsConnected] = useState(false);
  const [processedMsgIds] = useState(new Set<string>()); // 메시지 중복 처리 방지용

  // JWT 토큰에서 userId 추출 (클라이언트 측에서도 필요)
  const extractUserId = () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return null;

      // JWT는 header.payload.signature 형태
      const parts = token.split(".");
      if (parts.length !== 3) return null;

      // Base64 디코딩
      const payload = JSON.parse(atob(parts[1]));
      return payload.userId || payload.sub; // userId 필드나 sub 필드에서 사용자 ID 추출
    } catch (e) {
      console.error("토큰에서 userId 추출 실패:", e);
      return null;
    }
  };

  const userId = extractUserId();

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length]);

  // 웹소켓 연결 설정
  useEffect(() => {
    if (!id) {
      console.error("미팅 ID가 없습니다");
      return;
    }

    // JWT 토큰 가져오기
    const jwtToken = localStorage.getItem("accessToken");
    if (!jwtToken) {
      console.error("인증 토큰이 없습니다");
      return;
    }

    // 초기 메세지 가져오기
    fetchMessages(id, jwtToken);

    // STOMP 클라이언트 생성
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      connectHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },
      onConnect: () => {
        console.log("웹소켓 연결 성공");
        setIsConnected(true);

        // 일반 토픽 구독 (모든 사용자에게 전송되는 메시지)
        client.subscribe(`/topic/chat/${id}`, (message) => {
          try {
            const receivedMessage = JSON.parse(message.body);

            // 메시지 ID를 통한 중복 처리 방지
            if (processedMsgIds.has(receivedMessage.messageId)) {
              return; // 이미 처리된 메시지는 무시
            }

            // 처리한 메시지 ID 기록
            processedMsgIds.add(receivedMessage.messageId);

            // 내가 보낸 메시지는 개인 채널에서 처리할 것이므로 무시
            if (receivedMessage.userId === userId) {
              return;
            }

            const chatMessage: chatType = {
              nickname: receivedMessage.userName,
              me: false, // 일반 토픽에서 받은 메시지는 항상 다른 사람의 메시지
              owner: receivedMessage.isOwner,
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

        // 개인 채널 구독 (내가 보낸 메시지만)
        // if (userId) {
        //   client.subscribe(`/user/${userId}/chat/${id}`, (message) => {
        //     try {
        //       const receivedMessage = JSON.parse(message.body);
        //
        //       // 메시지 ID를 통한 중복 처리 방지
        //       if (processedMsgIds.has(receivedMessage.messageId)) {
        //         return; // 이미 처리된 메시지는 무시
        //       }
        //
        //       // 처리한 메시지 ID 기록
        //       processedMsgIds.add(receivedMessage.messageId);
        //
        //       const chatMessage: chatType = {
        //         nickname: "나", // 자신의 메시지는 "나"로 표시
        //         isMe: true, // 개인 채널로 받은 메시지는 항상 내 메시지
        //         isOwner: receivedMessage.isOwner,
        //         content: receivedMessage.messageContent,
        //         dateTime: receivedMessage.createdAt,
        //       };
        //
        //       // 스토어에 메시지 추가
        //       addMessage(chatMessage);
        //
        //       // 새 메시지 도착 시 스크롤
        //       scrollToBottom();
        //     } catch (error) {
        //       console.error("메시지 처리 중 오류:", error);
        //     }
        //   });
        //
        //   console.log(`개인 채널 구독: /user/${userId}/chat/${id}`);
        // } else {
        //   console.error("사용자 ID를 추출할 수 없어 개인 채널을 구독할 수 없습니다");
        // }
      },
      onStompError: (frame) => {
        console.error("STOMP 에러:", frame.headers, frame.body);
        setIsConnected(false);
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
  }, [id, fetchMessages, addMessage, userId, processedMsgIds]);

  // 스크롤 함수 분리
  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (msg: string) => {
    if (!msg.trim() || !stompClient || !stompClient.connected) return;
    if (!id) {
      console.error("미팅 ID가 없습니다");
      return;
    }

    try {
      // JWT 토큰 가져오기
      const jwtToken = localStorage.getItem("accessToken");
      if (!jwtToken) {
        console.error("인증 토큰이 없습니다");
        return;
      }

      // 웹소켓을 통해 메시지 전송
      stompClient.publish({
        destination: `/app/chat/${id}`,
        body: msg,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      console.log(`메시지 전송 - 채팅방: ${id}`);

      const tempMessage: chatType = {
        nickname: "나",
        me: true,
        owner: false, // 서버에서 확인 후 업데이트됨
        content: msg,
        dateTime: new Date().toString(),
      };

      addMessage(tempMessage);
      scrollToBottom();

      // 참고: 메시지는 서버에서 다시 받아 처리하므로
      // 여기서는 UI에 직접 추가하지 않음
    } catch (error) {
      console.error("메시지 전송 중 오류:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title={type || "채팅방"} />

      <main
        className="flex-1 overflow-y-auto px-5 mt-3"
        style={{ paddingBottom: CHAT_INPUT_HEIGHT }}
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            아직 메시지가 없습니다. 첫 메시지를 보내보세요!
          </div>
        ) : (
          messages.map((msg, index) => {
            const prev = messages[index - 1];
            const { showDate, showNickname } = getChatMessageMeta(msg, prev);

            return (
              <div key={index} className="flex flex-col gap-1">
                {showDate && (
                  <div className="text-Body1 font-bold text-center mt-4 mb-1">
                    {formatChatDate(msg.dateTime)}
                  </div>
                )}
                <MessageBox
                  nickname={msg.nickname}
                  me={msg.me}
                  owner={msg.owner}
                  content={msg.content}
                  date={formatChatDate(msg.dateTime)}
                  time={formatChatTime(msg.dateTime)}
                  showNickname={showNickname}
                />
              </div>
            );
          })
        )}
        <div ref={scrollRef} />
      </main>

      <ChatInput
        isDisabled={!!isEnd || !isConnected}
        onSend={handleSendMessage}
        onFocusInput={scrollToBottom}
      />
    </div>
  );
}
