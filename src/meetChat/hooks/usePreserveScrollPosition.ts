import { useEffect } from "react";

/**
 * 이전 메시지 로드 시, 스크롤 위치를 유지하는 커스텀 훅입니다.
 * @author 희진
 */

export function usePreserveScrollPosition({
  mainRef,
  messagesLength,
  prevScrollHeight,
  prevMessageCount,
  isLoading,
  isFetchingNextPage,
  setPrevMessageCount,
}: {
  mainRef: React.RefObject<HTMLDivElement>;
  messagesLength: number;
  prevScrollHeight: number;
  prevMessageCount: number;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  setPrevMessageCount: (n: number) => void;
}) {
  useEffect(() => {
    if (
      prevScrollHeight > 0 &&
      mainRef.current &&
      !isLoading &&
      !isFetchingNextPage &&
      messagesLength > prevMessageCount &&
      prevMessageCount > 0
    ) {
      const newScrollHeight = mainRef.current.scrollHeight;
      const heightDifference = newScrollHeight - prevScrollHeight;
      if (heightDifference > 0) {
        mainRef.current.scrollTop = heightDifference;
      }
      setPrevMessageCount(0);
    }
  }, [
    messagesLength,
    prevScrollHeight,
    isLoading,
    isFetchingNextPage,
    prevMessageCount,
  ]);
}
