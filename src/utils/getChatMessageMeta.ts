import { formatChatDate } from "./formatChatDate";
import { chatType } from "../meetChat/types/chatTypes";

/**
 * 채팅 메세지의 메타 정보를 반환하는 유틸
 * @author 희진
 */

export const getChatMessageMeta = (
  currentMessage: chatType,
  prevMessage: chatType
) => {
  const currentDate = formatChatDate(currentMessage.dateTime);
  const prevDate = prevMessage ? formatChatDate(prevMessage.dateTime) : null;

  const showDate = !prevMessage || currentDate !== prevDate;
  const showNickname =
    !prevMessage ||
    prevMessage.nickname !== currentMessage.nickname ||
    currentDate !== prevDate;

  return { currentDate, showDate, showNickname };
};
