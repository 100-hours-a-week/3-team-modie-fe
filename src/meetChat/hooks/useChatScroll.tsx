import { useState, useEffect, RefObject } from "react";
import { chatType } from "../types/chatTypes.ts";

interface ChatScrollProps {
  messages: chatType[];
  isLoading: boolean;
  mainRef: RefObject<HTMLDivElement>;
}

/**
 * 채팅 스크롤 관리를 위한 커스텀 훅
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
  const [initialScrollApplied, setInitialScrollApplied] = useState(false);

  // 최하단으로 스크롤하는 함수 - 애니메이션 없음
  const scrollToBottomImmediate = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: mainRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // 최하단으로 스크롤하는 함수 - 애니메이션 포함
  const scrollToBottom = () => {
    mainRef.current.scrollTo({
      top: mainRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  // 메시지 로드 완료 감지 및 초기 스크롤 처리
  useEffect(() => {
    // 최초 로딩이 완료되었고, 메시지가 있으며, 아직 초기 스크롤이 적용되지 않은 경우
    if (
      !isLoading &&
      initialLoad &&
      messages.length > 0 &&
      !initialScrollApplied
    ) {
      // 약간의 지연 후 스크롤 적용 (DOM 렌더링 완료 대기)
      const initialScrollTimer = setTimeout(() => {
        scrollToBottomImmediate(); // 애니메이션 없이 즉시 스크롤
        setInitialLoad(false);
        setInitialScrollApplied(true);
      }, 200);

      return () => clearTimeout(initialScrollTimer);
    }
  }, [isLoading, messages.length, initialLoad, initialScrollApplied]);

  // 메시지 변경 감지 및 스크롤 처리 (초기 로드 제외)
  useEffect(() => {
    // 메시지 길이가 변경된 경우만 처리
    if (messages.length <= prevMessagesLength || initialLoad) {
      setPrevMessagesLength(messages.length);
      return;
    }

    // 이전 메시지 로드 vs 새 메시지 구분
    if (prevScrollHeight > 0) {
      // 이전 메시지 로드 시에는 스크롤 위치 유지
      setPrevMessagesLength(messages.length);
      return;
    }

    scrollToBottom();
  }, [messages.length, initialLoad, prevScrollHeight, prevMessagesLength]);

  // 이전 메시지 로드 후 스크롤 위치 유지
  useEffect(() => {
    if (!isLoading && prevScrollHeight > 0 && mainRef.current) {
      const newScrollHeight = mainRef.current.scrollHeight;
      const scrollDiff = newScrollHeight - prevScrollHeight;

      // 이전 스크롤 위치 유지
      mainRef.current.scrollTop = scrollDiff > 0 ? scrollDiff : 0;

      // 스크롤 위치 기억 초기화
      setPrevScrollHeight(0);
    }
  }, [isLoading, prevScrollHeight]);

  return {
    prevScrollHeight,
    setPrevScrollHeight,
    scrollToBottom,
    scrollToBottomImmediate,
    initialLoad,
  };
}
