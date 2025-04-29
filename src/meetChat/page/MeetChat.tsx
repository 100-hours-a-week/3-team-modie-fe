import React, { useRef, useCallback, useEffect, useState } from "react";
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
import {
  sendChatMessage,
  NetworkError,
  AuthorizationError,
} from "../services/messageService";
import { useInView } from "react-intersection-observer";
import { useMessagesInfiniteScroll } from "../hooks/useMessagesInfiniteScroll";
import { useLoadMoreMessages } from "../hooks/useLoadMoreMessages";

export default function MeetChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { showToast } = useToast();

  // DOM refs
  const mainRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1, // 10% 이상 보이면 감지
    rootMargin: "100px 0px 0px 0px", // 상단에서 100px 이전에 감지
  });

  // 상태 관리
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
  const { addMessages, clearMessages, messages } = useChatStore();

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

  // useLoadMoreMessages 훅 사용하기
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

      // 로그를 통해 데이터 확인
      console.log("새로 불러온 데이터:", result);
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

  // 메시지 데이터 업데이트 - 개선된 버전
  useEffect(() => {
    if (!data) return;

    try {
      // 모든 페이지의 메시지를 합치기
      const allMessages = data.pages.flatMap((page) => {
        // 페이지가 undefined거나 메시지가 없는 경우 빈 배열 반환
        if (!page || !page.messages) return [];
        return page.messages;
      });

      console.log("모든 메시지:", allMessages.length);

      // 메시지 ID 기준으로 고유한 메시지만 유지
      const uniqueMessages = [
        ...new Map(allMessages.map((msg) => [msg.chatId, msg])).values(),
      ];

      // chatId 기준으로 오름차순 정렬 (작은 ID = 오래된 메시지가 먼저)
      uniqueMessages.sort((a, b) => a.chatId - b.chatId);

      // Zustand 상태 업데이트
      clearMessages();
      addMessages(uniqueMessages);

      // 초기 로딩 완료 후 처리
      if (!isFirstLoadFinished && !isLoading && uniqueMessages.length > 0) {
        setTimeout(() => {
          scrollToBottom();
          setIsFirstLoadFinished(true);
        }, 100);
      }
    } catch (error) {
      console.error("메시지 처리 중 오류 발생:", error);
    }
  }, [
    data,
    clearMessages,
    addMessages,
    isFirstLoadFinished,
    isLoading,
    scrollToBottom,
  ]);

  // 이전 메시지 로드 후 스크롤 위치 조정 - 개선된 버전
  useEffect(() => {
    // 이전 메시지를 로드했고, 메시지 개수가 증가했을 때만 실행
    if (
      prevScrollHeight > 0 &&
      mainRef.current &&
      !isLoading &&
      !isFetchingNextPage &&
      messages.length > prevMessageCount &&
      prevMessageCount > 0
    ) {
      // 새로운 메시지가 추가되면 발생하는 스크롤 높이 차이를 계산
      const newScrollHeight = mainRef.current.scrollHeight;
      const heightDifference = newScrollHeight - prevScrollHeight;

      // 스크롤 위치를 조정 - 사용자가 이전과 동일한 메시지를 보도록 함
      if (heightDifference > 0) {
        console.log(`스크롤 조정: ${heightDifference}px 만큼 조정`);
        mainRef.current.scrollTop = heightDifference;
      }

      // 상태 초기화
      setPrevMessageCount(0);
    }
  }, [
    messages.length,
    prevScrollHeight,
    isLoading,
    isFetchingNextPage,
    prevMessageCount,
  ]);

  // 메시지 전송 핸들러
  const handleSendMessage = useCallback(
    async (msg: string) => {
      if (!jwtToken) {
        showToast("로그인이 필요합니다");
        return;
      }

      try {
        await sendChatMessage(sendMessage, msg, jwtToken);
        // 메시지가 전송되면 자동으로 스크롤 내리기
        setTimeout(() => scrollToBottom(), 100);
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
    [jwtToken, sendMessage, showToast, scrollToBottom]
  );

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
          {/* 상단 감지 트리거 (이전 메시지 불러오기) */}
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
