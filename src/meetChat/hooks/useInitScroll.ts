import { useEffect } from "react";

/**
 * 채팅방의 초기 스크롤을 관리 훅입니다.
 * @author 희진
 */

export function useInitScroll({
  isLoading,
  messages,
  isFirstLoadFinished,
  scrollToBottomImmediate,
}: {
  isLoading: boolean;
  messages: unknown[];
  isFirstLoadFinished: boolean;
  scrollToBottomImmediate: () => void;
}) {
  useEffect(() => {
    if (isLoading && messages.length > 0 && !isFirstLoadFinished) {
      scrollToBottomImmediate();
    }
  }, [
    isLoading,
    messages.length,
    isFirstLoadFinished,
    scrollToBottomImmediate,
  ]);
}
