import Header from "../../common/components/Header";
import MessageBox from "../components/MessageBox";
import ChatInput from "../components/chatInput";
import { useEffect, useRef, useState } from "react";
import { formatChatDate, formatChatTime } from "../../utils/formatChatDate";
import { getChatMessageMeta } from "../../utils/getChatMessageMeta";
import { useChatStore } from "../hooks/useChat";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useChatSocket } from "../hooks/useChatSocket";
import { useToast } from "../../common/hooks/useToastMsg.tsx";

export default function MeetChat() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

  const { showToast } = useToast();

  const { messages, fetchMessages, fetchMoreMessages, hasMore, isLoading } =
    useChatStore();

  const location = useLocation();
  const { id, type, isEnd } = location.state || {};
  const CHAT_INPUT_HEIGHT = "10rem";
  const { userId, jwtToken } = useAuth();
  const { isConnected, sendMessage } = useChatSocket({
    chatId: id ? String(id) : null,
    userId,
    jwtToken,
  });

  useEffect(() => {
    if (!jwtToken) {
      localStorage.setItem("afterLoginRedirect", window.location.pathname);
      showToast("로그인이 필요합니다.");
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (!id || !jwtToken) return;
    fetchMessages(id, jwtToken);
  }, [id, fetchMessages, jwtToken]);

  // 스크롤 기능
  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length === 0) return;

    if (initialLoad) {
      scrollToBottom();
      setInitialLoad(false);
    } else {
      // 새 메시지가 추가된 경우에만 스크롤
      scrollToBottom();
    }
  }, [messages.length, initialLoad]);

  // 무한 스크롤 설정
  useEffect(() => {
    if (!loadMoreRef.current || !id || !jwtToken) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          // 스크롤 위치 기억을 위해 현재 스크롤 높이 저장
          if (mainRef.current) {
            setPrevScrollHeight(mainRef.current.scrollHeight);
          }
          fetchMoreMessages(id, jwtToken);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [id, jwtToken, fetchMoreMessages, hasMore, isLoading]);

  // 이전 메시지 로드 후 스크롤 위치 유지
  useEffect(() => {
    if (!isLoading && prevScrollHeight > 0 && mainRef.current) {
      const newScrollHeight = mainRef.current.scrollHeight;
      const scrollDiff = newScrollHeight - prevScrollHeight;
      mainRef.current.scrollTop = scrollDiff > 0 ? scrollDiff : 0;
      setPrevScrollHeight(0);
    }
  }, [isLoading, prevScrollHeight]);

  const handleSendMessage = (msg: string) => {
    try {
      if (sendMessage(msg, jwtToken)) {
        scrollToBottom();
      } else {
        console.error("메시지 전송 실패");
        // 여기에 토스트 메시지 등 사용자 알림 추가 가능
      }
    } catch (error) {
      console.error("메시지 전송 오류:", error);
      // 사용자에게 오류 알림 (토스트 메시지 등)
    }
  };

  const EmptyMessageIndicator = () => (
    <div className="flex items-center justify-center h-full text-gray-400">
      아직 메시지가 없습니다. 첫 메시지를 보내보세요!
    </div>
  );

  const MessageList = () => (
    <>
      {messages.map((msg, index) => {
        const prev = messages[index - 1];
        const { showDate, showNickname } = getChatMessageMeta(msg, prev);

        return (
          <div
            key={`msg-${index}-${msg.dateTime}`}
            className="flex flex-col gap-1"
          >
            {showDate && (
              <div className="text-Body1 font-bold text-center mt-4 mb-1">
                {formatChatDate(msg.dateTime)}
              </div>
            )}
            <MessageBox
              nickname={msg.nickname || ""}
              isMe={msg.isMe}
              isOwner={msg.isOwner || false}
              content={msg.content}
              date={formatChatDate(msg.dateTime)}
              time={formatChatTime(msg.dateTime)}
              showNickname={showNickname}
            />
          </div>
        );
      })}
    </>
  );

  return (
    <div className="flex flex-col h-screen">
      <Header title={type || "채팅방"} />

      <main
        ref={mainRef}
        className="flex-1 overflow-y-auto px-5 mt-3"
        style={{ paddingBottom: CHAT_INPUT_HEIGHT }}
      >
        {/* 더 불러오기 위한 요소 (화면 상단) */}
        <div
          ref={loadMoreRef}
          className="h-10 w-full flex items-center justify-center"
        >
          {isLoading && (
            <div className="text-gray-500 text-sm">
              이전 메시지 불러오는 중...
            </div>
          )}
          {!hasMore && messages.length > 0 && (
            <div className="text-gray-500 text-sm">이전 메시지가 없습니다</div>
          )}
        </div>

        {/* 3. 조건부 렌더링 최적화 */}
        {messages.length === 0 ? <EmptyMessageIndicator /> : <MessageList />}

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
