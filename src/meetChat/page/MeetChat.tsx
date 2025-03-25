import Header from "../../common/components/Header";
import MessageBox from "../components/MessageBox";
import ChatInput from "../components/chatInput";
import { useEffect, useRef, useState } from "react";
import { formatChatDate, formatChatTime } from "../../utils/formatChatDate";
import { getChatMessageMeta } from "../../utils/getChatMessageMeta";
import { useChatStore } from "../hooks/useChat";
import { useLocation } from "react-router-dom";
import { Client } from "@stomp/stompjs";

export default function MeetChat() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, fetchMessages, addMessage } = useChatStore();
  const location = useLocation();
  const { id, type, isEnd } = location.state || {};
  const CHAT_INPUT_HEIGHT = "10rem";
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [processedMsgIds] = useState(new Set<string>());

  const extractUserId = () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.userId || payload.sub;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const userId = extractUserId();

  useEffect(() => {
    if (!id) return;
    const jwtToken = localStorage.getItem("accessToken");
    if (!jwtToken) return;

    fetchMessages(id, jwtToken);

    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      connectHeaders: { Authorization: `Bearer ${jwtToken}` },
      onConnect: () => {
        setIsConnected(true);
        client.subscribe(`/topic/chat/${id}`, (message) => {
          try {
            const receivedMessage = JSON.parse(message.body);

            if (
              !receivedMessage ||
              !receivedMessage.content ||
              !receivedMessage.dateTime
            ) {
              return;
            }

            if (receivedMessage.userId === userId) {
              return;
            }

            if (processedMsgIds.has(receivedMessage.chatId)) return;
            processedMsgIds.add(receivedMessage.chatId);

            addMessage({
              nickname: receivedMessage.nickname,
              isMe: receivedMessage.userId === userId,
              isOwner: receivedMessage.isOwner,
              content: receivedMessage.content,
              dateTime: receivedMessage.dateTime,
            });

            scrollToBottom();
          } catch (error) {
            console.log(error);
          }
        });
      },
      onStompError: () => {
        setIsConnected(false);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      if (client.active) client.deactivate();
    };
  }, [id, fetchMessages, addMessage, userId, processedMsgIds]);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const handleSendMessage = async (msg: string) => {
    if (!msg.trim() || !stompClient?.connected || !id) return;
    const jwtToken = localStorage.getItem("accessToken");
    if (!jwtToken) return;

    stompClient.publish({
      destination: `/app/chat/${id}`,
      body: msg,
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    addMessage({
      nickname: "나",
      isMe: true,
      isOwner: false,
      content: msg,
      dateTime: new Date().toISOString(),
    });

    scrollToBottom();
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
                  isMe={msg.isMe}
                  isOwner={msg.isOwner}
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
