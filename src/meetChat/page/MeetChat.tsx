import { useRef, useEffect, useState } from "react";
import Header from "../../common/components/Header";
import { MessageList } from "../components/MessageList";
import { EmptyMessageIndicator } from "../components/EmptyMessageIndicator";
import ChatInput from "../components/ChatInput";
import { useChatStore } from "../store/useChatStore";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useChatSocket } from "../hooks/useChatSocket";
import { useToast } from "../../common/hooks/useToastMsg";
import { useChatScroll } from "../hooks/useChatScroll";
import { useInView } from "react-intersection-observer";
import { useMessagesInfiniteScroll } from "../hooks/useMessagesInfiniteScroll";
import { useLoadMoreMessages } from "../hooks/useLoadMoreMessages";
import { useInitializeChatMessages } from "../hooks/useInitializeChatMessages";
import { usePreserveScrollPosition } from "../hooks/usePreserveScrollPosition";
import { useSendMessageHandler } from "../hooks/useSendMessageHandler";

export default function MeetChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { showToast } = useToast();

  const mainRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: "100px 0px 0px 0px",
  });

  const [isFirstLoadFinished, setIsFirstLoadFinished] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // 상태 및 유저 정보 추출
  const locationState = location.state || {};
  const meetIdFromParams = params.meetId;
  const id = meetIdFromParams || locationState.id;
  const { type, isEnd } = locationState;
  const CHAT_INPUT_HEIGHT = "10rem";
  const { userId, jwtToken } = useAuth();

  // 채팅 소켓 연결 설정
  const { isConnected, sendMessage } = useChatSocket({
    chatId: id,
    userId,
    jwtToken,
  });

  // Zustand 상태 관리 (메시지 저장)
  const { messages } = useChatStore();

  // 무한 스크롤 기반 메시지 가져오기 (onSuccess 콜백 추가)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMessagesInfiniteScroll(id);

  // 메시지 스크롤 제어 훅
  const { prevScrollHeight, setPrevScrollHeight, scrollToBottom } =
    useChatScroll({
      messages,
      isLoading,
      mainRef,
    });

  // 이전 스크롤 높이와 이전 메시지 개수를 저장
  const [prevMessageCount, setPrevMessageCount] = useState(0);

  useLoadMoreMessages({
    inView,
    mainRef,
    isFirstLoadFinished,
    hasNextPage,
    isFetchingNextPage,
    isFetchingMore,
    fetchNextPage: async () => {
      // 데이터를 가져오기 전에 현재 스크롤 높이와 메시지 개수 저장
      if (mainRef.current) {
        setPrevScrollHeight(mainRef.current.scrollHeight);
        setPrevMessageCount(messages.length);
      }

      // fetchNextPage를 호출하고 결과를 추적
      const result = await fetchNextPage();

      setLastFetchedData(result);

      return result;
    },
    setPrevScrollHeight,
    setIsFetchingMore,
  });

  // 로그인 상태 확인
  useEffect(() => {
    if (!jwtToken) {
      localStorage.setItem("afterLoginRedirect", `/${id}/chat`);
      showToast("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
  }, [jwtToken, showToast, navigate, id]);

  useInitializeChatMessages({
    data,
    isLoading,
    isFirstLoadFinished,
    setIsFirstLoadFinished,
    scrollToBottom,
  });

  usePreserveScrollPosition({
    mainRef,
    messagesLength: messages.length,
    prevScrollHeight,
    prevMessageCount,
    isLoading,
    isFetchingNextPage,
    setPrevMessageCount,
  });

  const handleSendMessage = useSendMessageHandler({
    sendMessage,
    jwtToken,
    scrollToBottom,
  });

  return (
    <div className="flex flex-col h-screen">
      <Header title={type || "채팅방"} canGoMeetDetail={true} meetId={id} />
      <main
        ref={mainRef}
        className="relative flex-1 overflow-y-auto mt-3 custom-scrollbar"
        style={{
          marginBottom: `${CHAT_INPUT_HEIGHT}`,
        }}
      >
        <div className="px-5">
          <div
            ref={loadMoreRef}
            className="h-10 w-full flex items-center justify-center"
          >
            {isFetchingNextPage && (
              <div className="text-gray-500 text-sm">
                이전 메시지 불러오는 중...
              </div>
            )}
            {!hasNextPage && messages.length > 0 && (
              <div className="text-gray-500 text-sm">
                이전 메시지가 없습니다
              </div>
            )}
          </div>

          {/* 메시지 목록 렌더링 */}
          {messages.length === 0 ? (
            <EmptyMessageIndicator />
          ) : (
            <MessageList messages={messages} />
          )}
          <div ref={scrollRef} />
        </div>

        {/* 채팅 입력창 */}
        <ChatInput
          isDisabled={!!isEnd || !isConnected}
          onSend={handleSendMessage}
          onFocusInput={scrollToBottom}
        />
      </main>
    </div>
  );
}
