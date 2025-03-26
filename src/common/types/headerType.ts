import { meetType } from "./meetType";

/**
 * 헤더에 들어가는 값의 타입을 정의합니다.
 * @author 희진
 */

export interface headerType {
  title?: string;
  meetStatus?: meetType;
  isMainPage?: boolean;
  canGoHome?: boolean;
}
