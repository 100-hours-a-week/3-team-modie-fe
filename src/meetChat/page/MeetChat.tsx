import Header from "../../common/components/Header";
import MessageBox from "../components/MessageBox";
import ChatInput from "../components/chatInput";
import { useEffect, useRef, useState } from "react";
import { formatChatDate, formatChatTime } from "../../utils/formatChatDate";
import { getChatMessageMeta } from "../../utils/getChatMessageMeta";
import { useChatStore } from "../hooks/useChat";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useChatSocket } from "../hooks/useChatSocket";
import { useToast } from "../../common/hooks/useToastMsg.tsx";

export default function MeetChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams(); // URL 파라미터 추출을 위한 hook 추가

  const scrollRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false); // 스크롤 중복 방지용 상태 추가

  const { showToast } = useToast();

  const { messages, fetchMessages, fetchMoreMessages, hasMore, isLoading } =
    useChatStore();

  const locationState = location.state || {};
  const meetIdFromParams = params.meetId; // URL 파라미터에서 meetId 추출 (/:meetId/chat 형식)

  // 우선순위: URL 파라미터 > location.state
  const id = meetIdFromParams || locationState.id;
  const { type, isEnd } = locationState;

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

  // 최적화된 스크롤 기능
  const scrollToBottom = () => {
    // 이미 스크롤 중이면 추가 스크롤 방지
    if (isScrolling) return;

    setIsScrolling(true); // 스크롤 시작 상태 설정

    // 직접 scrollTop 설정 (애니메이션 없이 바로 이동)
    if (mainRef.current) {
      mainRef.current.scrollTop = mainRef.current.scrollHeight;
    }

    // 스크롤 상태 해제를 위한 타이머
    setTimeout(() => {
      setIsScrolling(false);
    }, 300); // 스크롤 애니메이션 완료 예상 시간
  };

  // 메시지 로드 후 한 번만 스크롤 처리
  useEffect(() => {
    if (messages.length === 0 || isLoading) return;

    // 메시지가 로드되고 로딩이 완료된 경우에만 타이머 설정
    const scrollTimer = setTimeout(() => {
      scrollToBottom();
      if (initialLoad) {
        setInitialLoad(false);
      }
    }, 150); // 적절한 지연 시간

    return () => clearTimeout(scrollTimer); // 타이머 정리
  }, [messages.length, isLoading]);

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
        // 메시지 전송 후 스크롤 처리는 메시지 목록 업데이트 후 useEffect에서 처리됨
      } else {
        console.error("메시지 전송 실패");
        showToast("메시지를 보낼 수 없습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("메시지 전송 오류:", error);
      showToast("메시지 전송 중 오류가 발생했습니다.");
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

        {/* 조건부 렌더링 최적화 */}
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
