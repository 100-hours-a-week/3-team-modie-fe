/**
 * 모달의 타입을 상수로 정의합니다.
 * @author 희진
 */

export const MODAL_TYPES = {
  DELETE: "delete",
  END: "end",
  HIDE: "hide",
  EXIT: "exit",
} as const;

export type ModalType = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES];
