import Header from "../../common/components/Header";
import MessageBox from "../components/MessageBox";
import ChatInput from "../components/chatInput";
import { useEffect, useRef } from "react";
import { formatChatDate, formatChatTime } from "../../utils/formatChatDate";
import { getChatMessageMeta } from "../../utils/getChatMessageMeta";
import { useChatStore } from "../hooks/useChat";
import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useChatSocket } from "../hooks/useChatSocket";

export default function MeetChat() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, fetchMessages } = useChatStore();
  const location = useLocation();
  const { id, type, isEnd } = location.state || {};
  const CHAT_INPUT_HEIGHT = "10rem";
  const { userId, jwtToken } = useAuth();
  const { isConnected, sendMessage } = useChatSocket({
    chatId: id,
    userId,
    jwtToken,
  });

  // 메시지 로드
  useEffect(() => {
    if (!id || !jwtToken) return;
    fetchMessages(id, jwtToken);
  }, [id, fetchMessages, jwtToken]);

  // 스크롤 기능
  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  // 메시지 전송 핸들러
  const handleSendMessage = (msg: string) => {
    if (sendMessage(msg, jwtToken)) {
      scrollToBottom();
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
