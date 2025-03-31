import { RefObject, useEffect } from "react";

interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * 무한 스크롤 등에 사용할 수 있는 Intersection Observer 훅
 *
 * @param targetRef 관찰할 요소의 RefObject
 * @param callback 요소가 보일 때 실행할 콜백 함수
 * @param options IntersectionObserver 옵션
 */
export function useIntersectionObserver<T extends HTMLElement>(
  targetRef: RefObject<T>,
  callback: () => void,
  options: IntersectionObserverOptions = { threshold: 0.1 }
) {
  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    }, options);

    observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [targetRef, callback, options]);
}
