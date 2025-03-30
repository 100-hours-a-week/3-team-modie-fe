import React, { useMemo } from "react";
import { chatType, ChatMetadata } from "../types/chatTypes.ts";
import MessageBox from "./MessageBox";
import { formatChatDate, formatChatTime } from "../../utils/formatChatDate";
import { getChatMessageMeta } from "../../utils/getChatMessageMeta";

interface MessageItemProps {
  message: chatType;
  prevMessage: chatType | null;
}

/**
 * 개별 메시지 아이템 컴포넌트
 * 메모이제이션을 통해 불필요한 렌더링 방지
 */
export const MessageItem = React.memo(
  ({ message, prevMessage }: MessageItemProps) => {
    // 메시지 메타데이터(날짜 표시 여부, 닉네임 표시 여부) 계산
    const { showDate, showNickname } = useMemo<ChatMetadata>(
      () => getChatMessageMeta(message, prevMessage),
      [message, prevMessage]
    );

    return (
      <div className="flex flex-col gap-1">
        {showDate && (
          <div className="text-Body1 font-bold text-center mt-4 mb-1">
            {formatChatDate(message.dateTime)}
          </div>
        )}
        <MessageBox
          nickname={message.nickname || ""}
          isMe={message.isMe}
          isOwner={message.isOwner || false}
          content={message.content}
          date={formatChatDate(message.dateTime)}
          time={formatChatTime(message.dateTime)}
          showNickname={showNickname}
        />
      </div>
    );
  }
);
