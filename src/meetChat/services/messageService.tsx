import * as Sentry from "@sentry/react";

/**
 * 메시지 전송 관련 서비스 및 에러 클래스
 */

// 네트워크 관련 에러 클래스
export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

// 권한 관련 에러 클래스
export class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthorizationError";
  }
}

/**
 * 채팅 메시지 전송 함수
 *
 * @param socketSend 소켓 전송 함수
 * @param message 전송할 메시지
 * @param token 인증 토큰
 * @returns 전송 성공 여부
 */
export async function sendChatMessage(
  socketSend: (msg: string, token: string) => boolean,
  message: string,
  token: string
): Promise<boolean> {
  try {
    const result = socketSend(message, token);
    if (!result) {
      throw new Error("메시지 전송 실패");
    }
    return true;
  } catch (error) {
    Sentry.captureException(error);

    if (error instanceof Error) {
      if (
        error.message.includes("네트워크") ||
        error.message.includes("연결")
      ) {
        throw new NetworkError("네트워크 연결에 문제가 있습니다");
      } else if (
        error.message.includes("권한") ||
        error.message.includes("인증")
      ) {
        throw new AuthorizationError("메시지 전송 권한이 없습니다");
      }
    }
    throw error;
  }
}
