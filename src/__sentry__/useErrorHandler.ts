// hooks/useErrorHandler.ts
import * as Sentry from "@sentry/react";
import {
  NetworkError,
  AuthorizationError,
  ValidationError,
  NotFoundError,
} from "./errors";

type ErrorType =
  | "auth"
  | "chat"
  | "meet-manage"
  | "meet-detail"
  | "meet-list"
  | "my"
  | "login"
  | "default";

type PageType =
  | "meet-list"
  | "meet-detail"
  | "meet-edit"
  | "meet-create"
  | "chat"
  | "my-page"
  | "login";

interface UseErrorHandlerOptions {
  type?: ErrorType;
  page?: PageType;
  useAlert?: boolean;
  extra?: Record<string, unknown>;
  tags?: Record<string, string>;
  level?: "info" | "warning" | "error" | "fatal";
  message?: string;
}

// 외부에서 setGlobalErrorToast로 등록해주는 toast 함수
let globalToast: ((msg: string) => void) | null = null;

export const setGlobalErrorToast = (fn: (msg: string) => void) => {
  globalToast = fn;
};

// ✅ 전역에서도 사용 가능한 handleError
export const handleError = (
  e: unknown,
  options: UseErrorHandlerOptions = {}
) => {
  const {
    type = "default",
    page,
    useAlert = false,
    message,
    level = "error",
    tags,
    extra,
  } = options;

  const notify = useAlert
    ? alert
    : globalToast
      ? globalToast
      : (msg: string) => console.error("Toast not initialized:", msg);

  const baseTags = {
    feature: type,
    page,
    ...tags,
  };

  const captureWarning = (msg: string) => {
    Sentry.captureMessage(msg, {
      level: "warning",
      tags: baseTags,
      extra,
    });
  };

  if (message) {
    Sentry.captureMessage(message, {
      level,
      tags: baseTags,
      extra,
    });
    return;
  }

  switch (type) {
    case "chat":
      if (e instanceof NetworkError) {
        notify("채팅 서버와 연결할 수 없습니다.");
        captureWarning("채팅 네트워크 오류 발생");
      } else if (e instanceof AuthorizationError) {
        notify("채팅 권한이 없습니다.");
        captureWarning("채팅 권한 오류 발생");
      } else {
        notify("채팅 중 오류가 발생했습니다.");
        Sentry.captureException(e, { tags: baseTags, extra });
      }
      break;

    case "auth":
      if (e instanceof AuthorizationError) {
        notify("인증 권한이 없습니다.");
        captureWarning("인증 권한 오류 발생");
      } else if (e instanceof ValidationError) {
        notify("입력값이 유효하지 않습니다.");
        captureWarning("인증 입력값 오류 발생");
      } else {
        notify("인증 처리 중 오류가 발생했습니다.");
        Sentry.captureException(e, { tags: baseTags, extra });
      }
      break;

    case "login":
      if (e instanceof ValidationError) {
        notify("입력하신 정보가 유효하지 않습니다.");
        captureWarning("로그인 입력 오류");
      } else if (e instanceof AuthorizationError) {
        notify("로그인 권한이 없습니다.");
        captureWarning("로그인 권한 오류");
      } else {
        notify("로그인 중 오류가 발생했습니다.");
        Sentry.captureException(e, { tags: baseTags, extra });
      }
      break;

    case "meet-detail":
      if (e instanceof NotFoundError) {
        notify("존재하지 않는 모임입니다.");
        captureWarning("존재하지 않는 모임 접근");
      } else {
        notify("모임 정보를 불러오는 데 실패했습니다.");
        Sentry.captureException(e, { tags: baseTags, extra });
      }
      break;

    case "meet-list":
      notify("모임 목록을 불러오는 데 실패했습니다.");
      Sentry.captureException(e, { tags: baseTags, extra });
      break;

    case "meet-manage":
      if (e instanceof AuthorizationError) {
        notify("모임 관리 권한이 없습니다.");
        captureWarning("모임 관리 권한 오류");
      } else if (e instanceof ValidationError) {
        notify("입력값이 유효하지 않습니다.");
        captureWarning("모임 관리 입력 오류");
      } else {
        notify("모임 관리 중 오류가 발생했습니다.");
        Sentry.captureException(e, { tags: baseTags, extra });
      }
      break;

    case "my":
      notify("마이페이지 처리 중 오류가 발생했습니다.");
      Sentry.captureException(e, { tags: baseTags, extra });
      break;

    default:
      if (e instanceof NetworkError) {
        notify("네트워크 연결에 문제가 있습니다.");
        captureWarning("기본 네트워크 오류");
      } else if (e instanceof AuthorizationError) {
        notify("권한이 없습니다.");
        captureWarning("기본 권한 오류");
      } else if (e instanceof ValidationError) {
        notify("입력값을 다시 확인해주세요.");
        captureWarning("기본 입력 오류");
      } else if (e instanceof NotFoundError) {
        notify("요청한 정보를 찾을 수 없습니다.");
        captureWarning("기본 Not Found");
      } else if (e instanceof Error) {
        notify(e.message);
        Sentry.captureException(e, { tags: baseTags, extra });
      } else {
        notify("알 수 없는 오류가 발생했습니다.");
        Sentry.captureException(new Error("Unknown error"), {
          tags: baseTags,
          extra: { originalError: e },
        });
      }
      break;
  }
};
