/**
 * 토스트 메세지, 제출 버튼에 대한 타입을 정의합니다.
 * @author 희진
 */

export interface ToastMsgProps {
  active: boolean; // 토스트 메세지 활성 여부
  description: string; // 토스트 메세지 내부 텍스트
}

export interface SubmitBtnProps {
  active: boolean; // 버튼 활성/비활성 여부
  description: string; // 버튼 내부 텍스트
}
