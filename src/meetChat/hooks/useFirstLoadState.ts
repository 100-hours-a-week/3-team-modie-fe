import { useEffect } from "react";

/**
 * 채팅방의 초기 메세지 데이터 패치 관리 훅입니다.
 * @author 희진
 */

export function useFirstLoadState({
  isLoading,
  data,
  isFirstLoadFinished,
  setIsFirstLoadFinished,
  scrollToBottomImmediate,
}: {
  isLoading: boolean;
  data: unknown;
  isFirstLoadFinished: boolean;
  setIsFirstLoadFinished: (finished: boolean) => void;
  scrollToBottomImmediate: () => void;
}) {
  useEffect(() => {
    if (!isLoading && data && !isFirstLoadFinished) {
      scrollToBottomImmediate();
      setTimeout(() => {
        setIsFirstLoadFinished(true);
      }, 1000);
    }
  }, [
    isLoading,
    data,
    isFirstLoadFinished,
    setIsFirstLoadFinished,
    scrollToBottomImmediate,
  ]);
}
