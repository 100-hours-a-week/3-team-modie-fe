import React from "react";
import { chatType } from "../types/chatTypes.ts";
import { MessageItem } from "./MessageItem";

interface MessageListProps {
  messages: chatType[];
}

/**
 * 메시지 목록 컴포넌트
 * 전체 메시지 목록을 표시하며 메모이제이션을 통해 성능 최적화
 */
export const MessageList = React.memo(({ messages }: MessageListProps) => {
  return (
    <>
      {messages.map((message, index) => (
        <MessageItem
          key={`msg-${index}-${message.dateTime}`}
          message={message}
          prevMessage={index > 0 ? messages[index - 1] : null}
        />
      ))}
    </>
  );
});
