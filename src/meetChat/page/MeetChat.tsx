import Header from "../../common/components/Header";
import MessageBox from "../components/MessageBox";
import ChatInput from "../components/chatInput";
import { useEffect, useRef } from "react";
import { formatChatTime } from "../../utils/formatChatDate";
import { getChatMessageMeta } from "../../utils/getChatMessageMeta";
import { useChatStore } from "../hooks/useChat";
import { useLocation } from "react-router-dom";

export default function MeetChat() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, fetchMessages } = useChatStore();
  const location = useLocation();
  const { id, type, isEnd } = location.state || {};
  const CHAT_INPUT_HEIGHT = "10rem";

  useEffect(() => {
    fetchMessages(id);
  }, [id, fetchMessages]);

  // ✅ 스크롤 함수 분리
  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (msg: string) => {
    // 🎯 여기서 서버 전송 성공했다고 "가정"
    // 예: await sendMessageToServer(msg);

    // 가짜 전송 성공 처리
    const fakeMessage = {
      nickname: "나",
      isMe: true,
      isOwner: true,
      content: msg,
      dateTime: new Date().toISOString(), // 실제 포맷과 맞추기
    };

    // 상태에 메시지 추가
    // useChatStore.getState().addMessage(fakeMessage);
    console.log(fakeMessage);

    // 전송 성공 시에만 스크롤
    scrollToBottom();
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

          return (
            <div key={index} className="flex flex-col gap-1">
              {showDate && (
                <div className="text-Body1 font-bold text-center mt-4 mb-1">
                  {currentDate}
                </div>
              )}
              <MessageBox
                nickname={msg.nickname}
                isMe={msg.isMe}
                isOwner={msg.isOwner}
                content={msg.content}
                date={currentDate}
                time={formatChatTime(msg.dateTime)}
                showNickname={showNickname}
              />
            </div>
          );
        })}
        <div ref={scrollRef} />
      </main>

      <ChatInput
        isDisabled={!!isEnd}
        onSend={handleSendMessage}
        onFocusInput={scrollToBottom}
      />
    </div>
  );
}
