import { useEffect } from "react";

/**
 * 모달 외부 클릭시 모달을 닫습니다.
 * @author 희진
 */

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  active = true
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    if (active) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback, active]);
};
