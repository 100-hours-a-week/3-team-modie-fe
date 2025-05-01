import { useEffect, useRef } from "react";

/**
 * 스크롤 상단 도달 시 한번만 fetchNextPage 호출하고
 * 사용자가 스크롤을 내려갔다가 다시 올라와야 다시 호출 가능
 */
export function useLoadMoreMessages({
  inView,
  mainRef,
  isFirstLoadFinished,
  hasNextPage,
  isFetchingNextPage,
  isFetchingMore,
  fetchNextPage,
  setPrevScrollHeight,
  setIsFetchingMore,
}: {
  inView: boolean;
  mainRef: React.RefObject<HTMLDivElement>;
  isFirstLoadFinished: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isFetchingMore: boolean;
  fetchNextPage: () => Promise<void>;
  setPrevScrollHeight: (height: number) => void;
  setIsFetchingMore: (fetching: boolean) => void;
}) {
  const triggeredRef = useRef(false);

  useEffect(() => {
    if (
      inView &&
      isFirstLoadFinished &&
      hasNextPage &&
      !isFetchingNextPage &&
      !isFetchingMore &&
      !triggeredRef.current &&
      mainRef.current &&
      mainRef.current.scrollTop <= 100
    ) {
      triggeredRef.current = true;

      (async () => {
        setIsFetchingMore(true);
        setPrevScrollHeight(mainRef.current!.scrollHeight);

        try {
          await fetchNextPage();
        } finally {
          setIsFetchingMore(false);
        }
      })();
    }
  }, [
    inView,
    isFirstLoadFinished,
    hasNextPage,
    isFetchingNextPage,
    isFetchingMore,
    fetchNextPage,
    setPrevScrollHeight,
    setIsFetchingMore,
    mainRef,
  ]);

  // ⭐ 사용자가 스크롤을 "아래로" 내리면 트리거 다시 풀어줌
  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;

    const handleScroll = () => {
      if (mainElement.scrollTop > 200) {
        triggeredRef.current = false;
      }
    };

    mainElement.addEventListener("scroll", handleScroll);
    return () => {
      mainElement.removeEventListener("scroll", handleScroll);
    };
  }, [mainRef]);
}
