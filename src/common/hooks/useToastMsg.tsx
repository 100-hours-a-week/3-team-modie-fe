import { useState } from "react";

/**
 * 토스트 메세지를 관리합니다.
 * @author 희진
 */

export const useToast = (duration: number = 2000) => {
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), duration);
  };

  return { toastMessage, isToastVisible, showToast };
};
