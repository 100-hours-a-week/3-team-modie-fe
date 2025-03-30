import React, { useRef, useCallback, useEffect } from "react";
import Header from "../../common/components/Header";
import { MessageList } from "../components/MessageList";
import { EmptyMessageIndicator } from "../components/EmptyMessageIndicator";
import ChatInput from "../components/chatInput";
import { useChatStore } from "../hooks/useChat";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useChatSocket } from "../hooks/useChatSocket";
import { useToast } from "../../common/hooks/useToastMsg";
import { useChatScroll } from "../hooks/useChatScroll";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import {
  sendChatMessage,
  NetworkError,
  AuthorizationError,
} from "../services/messageService";

/**
 * 미팅 채팅 컴포넌트
 * 채팅 메시지 목록과 입력 영역을 포함
 */
export default function MeetChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams(); // URL 파라미터 추출을 위한 hook 추가

  const scrollRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

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

  // 스크롤 관리 커스텀 훅 적용
  const { setPrevScrollHeight, scrollToBottom } = useChatScroll({
    messages,
    isLoading,
    mainRef: mainRef as React.RefObject<HTMLDivElement>,
  });

  // 로그인 확인
  useEffect(() => {
    if (!jwtToken) {
      localStorage.setItem("afterLoginRedirect", window.location.pathname);
      showToast("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [jwtToken, showToast, navigate]);

  // 메시지 로드
  useEffect(() => {
    if (!id || !jwtToken) return;
    fetchMessages(id, jwtToken);
  }, [id, fetchMessages, jwtToken]);

  // 무한 스크롤 감지 - 커스텀 훅 사용
  useIntersectionObserver<HTMLDivElement>(
    loadMoreRef as React.RefObject<HTMLDivElement>,
    () => {
      if (hasMore && !isLoading && id && jwtToken) {
        if (mainRef.current) {
          setPrevScrollHeight(mainRef.current.scrollHeight);
        }
        fetchMoreMessages(id, jwtToken);
      }
    },
    { threshold: 0.1 }
  );

  // 메시지 전송 핸들러 - useCallback으로 최적화
  const handleSendMessage = useCallback(
    async (msg: string) => {
      if (!jwtToken) {
        showToast("로그인이 필요합니다");
        return;
      }

      try {
        await sendChatMessage(sendMessage, msg, jwtToken);
        // 성공 시 스크롤은 메시지 목록 변화 감지 시 자동으로 처리됨
      } catch (error) {
        console.error("메시지 전송 오류:", error);

        if (error instanceof NetworkError) {
          showToast("네트워크 연결을 확인해주세요");
        } else if (error instanceof AuthorizationError) {
          showToast("메시지 전송 권한이 없습니다");
        } else {
          showToast("메시지 전송에 실패했습니다. 다시 시도해주세요");
        }
      }
    },
    [jwtToken, sendMessage, showToast]
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

        {/* 조건부 렌더링 최적화 - 메모이제이션된 컴포넌트 사용 */}
        {messages.length === 0 ? (
          <EmptyMessageIndicator />
        ) : (
          <MessageList messages={messages} />
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
