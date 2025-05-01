import { useCallback } from "react";
import {
  sendChatMessage,
  NetworkError,
  AuthorizationError,
} from "../services/messageService";
import { useToast } from "../../common/hooks/useToastMsg";

/**
 * 메시지 전송 로직 및 예외 처리용 커스텀 훅입니다.
 * @author 희진
 */

interface UseSendMessageHandlerParams {
  sendMessage: (msg: string) => void;
  jwtToken: string | null;
  scrollToBottom: () => void;
}

export function useSendMessageHandler({
  sendMessage,
  jwtToken,
  scrollToBottom,
}: UseSendMessageHandlerParams) {
  const { showToast } = useToast();

  return useCallback(
    async (msg: string) => {
      if (!jwtToken) {
        showToast("로그인이 필요합니다");
        return;
      }

      try {
        await sendChatMessage(sendMessage, msg, jwtToken);
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
    [jwtToken, sendMessage, scrollToBottom, showToast]
  );
}
