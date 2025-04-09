// 네트워크 관련 에러 클래스
export class NetworkError extends Error {
  constructor(message = "네트워크 오류가 발생했습니다.") {
    super(message);
    this.name = "NetworkError";
  }
}

// 권한 관련 에러 클래스
export class AuthorizationError extends Error {
  constructor(message = "권한이 없습니다.") {
    super(message);
    this.name = "AuthorizationError";
  }
}

export class ValidationError extends Error {
  constructor(message = "입력값이 유효하지 않습니다.") {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(message = "요청하신 정보를 찾을 수 없습니다.") {
    super(message);
    this.name = "NotFoundError";
  }
}

export class UnknownError extends Error {
  constructor(message = "알 수 없는 오류가 발생했습니다.") {
    super(message);
    this.name = "UnknownError";
  }
}
