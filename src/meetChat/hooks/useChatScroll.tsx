import { useState, useEffect, RefObject, useCallback } from "react";
import { chatType } from "../types/chatTypes";

interface ChatScrollProps {
  messages: chatType[];
  isLoading: boolean;
  mainRef: RefObject<HTMLDivElement>;
}

/**
 * 채팅 스크롤 관리 훅
 * 새 메시지, 이전 메시지 로드 시 스크롤 위치를 적절히 처리합니다.
 */
export function useChatScroll({
  messages,
  isLoading,
  mainRef,
}: ChatScrollProps) {
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const [prevMessagesLength, setPrevMessagesLength] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  // 즉시 스크롤을 맨 아래로 이동시키는 함수
  const scrollToBottomImmediate = useCallback(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = mainRef.current.scrollHeight;
    }
  }, [mainRef]);

  // 부드럽게 스크롤을 맨 아래로 이동시키는 함수
  const scrollToBottom = useCallback(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: mainRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [mainRef]);

  // 사용자의 스크롤 이벤트 감지
  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;

    const handleScroll = () => {
      if (!mainElement) return;

      // 스크롤이 맨 아래에서 100px 이상 떨어져 있으면 사용자가 스크롤 중이라고 판단
      const isNearBottom =
        mainElement.scrollHeight -
          mainElement.scrollTop -
          mainElement.clientHeight <
        100;

      setIsUserScrolling(!isNearBottom);
    };

    mainElement.addEventListener("scroll", handleScroll);
    return () => {
      mainElement.removeEventListener("scroll", handleScroll);
    };
  }, [mainRef]);

  // 1. 채팅방 처음 입장했을 때: 무조건 맨 아래로 스크롤
  useEffect(() => {
    if (!isLoading && initialLoad && messages.length > 0) {
      const timer = setTimeout(() => {
        scrollToBottom();
        setInitialLoad(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isLoading, messages.length, initialLoad, scrollToBottom]);

  // 2. 과거 메시지 로드 후 스크롤 위치 유지
  useEffect(() => {
    if (!isLoading && prevScrollHeight > 0 && mainRef.current) {
      const newScrollHeight = mainRef.current.scrollHeight;
      const scrollDiff = newScrollHeight - prevScrollHeight;

      if (scrollDiff > 0) {
        mainRef.current.scrollTop = scrollDiff;
        setPrevScrollHeight(0);
      }
    }
  }, [mainRef, isLoading, prevScrollHeight]);

  // 3. 새로운 메시지 추가 시 사용자가 스크롤 중이 아니면 맨 아래로 스크롤
  useEffect(() => {
    if (
      !isLoading &&
      messages.length > prevMessagesLength &&
      !isUserScrolling
    ) {
      scrollToBottom();
      setPrevMessagesLength(messages.length);
    } else if (messages.length !== prevMessagesLength) {
      setPrevMessagesLength(messages.length);
    }
  }, [
    messages.length,
    prevMessagesLength,
    isLoading,
    isUserScrolling,
    scrollToBottom,
  ]);

  return {
    prevScrollHeight,
    setPrevScrollHeight,
    scrollToBottom,
    scrollToBottomImmediate,
    initialLoad,
    isUserScrolling,
  };
}
