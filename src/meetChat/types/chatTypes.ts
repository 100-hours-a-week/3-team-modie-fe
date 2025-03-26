/**
 * 채팅 데이터의 타입을 정의합니다.
 * @author 희진
 */

export interface chatType {
  nickname?: string;
  isMe: boolean;
  isOwner?: boolean;
  content: string;
  dateTime: string;
}
