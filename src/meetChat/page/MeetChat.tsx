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
  const { id, type } = location.state || {};

  // 처음 렌더링 시 fetchMessages 호출
  useEffect(() => {
    fetchMessages(id); // 예시 meetId = 1
  }, [id, fetchMessages]);

  // 마지막 메시지로 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      {/* TODO: 모임 유형으로 변경해야 함 */}
      <Header title={type || "아직!"} />

      <main className="flex-1 overflow-y-auto px-5 pb-[16.3rem] mt-3">
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
        isDisabled={false}
        onSend={(msg) => {
          // TODO: 채팅 보내는 api 연동
          console.log("보낸 메시지:", msg);
        }}
        onFocusInput={() => {
          scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </div>
  );
}
