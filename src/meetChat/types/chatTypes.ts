/**
 * 채팅 데이터의 타입을 정의합니다.
 * @author 희진
 */

export interface chatType {
  chatId?: number;
  nickname?: string;
  isMe: boolean;
  isOwner?: boolean;
  content: string;
  dateTime: string;
}

/**
 * 채팅 메시지 메타데이터 인터페이스
 */
export interface ChatMetadata {
  showDate: boolean;
  showNickname: boolean;
}
