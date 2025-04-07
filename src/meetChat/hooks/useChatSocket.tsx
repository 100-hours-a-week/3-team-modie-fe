import { useState, useEffect, useCallback, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { useChatStore } from "./useChat";
import * as Sentry from "@sentry/react";

interface UseChatSocketProps {
  chatId: string | null;
  userId: string | null;
  jwtToken: string | null;
}

export const useChatSocket = ({
  chatId,
  userId,
  jwtToken,
}: UseChatSocketProps) => {
  const { addMessage } = useChatStore();
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const processedMsgIds = useRef(new Set<string>());

  useEffect(() => {
    if (!chatId) return;
    if (!jwtToken) return;

    const client = new Client({
      brokerURL: import.meta.env.VITE_CHAT_WSS_URL,
      connectHeaders: { Authorization: `Bearer ${jwtToken}` },
      onConnect: () => {
        setIsConnected(true);
        client.subscribe(`/topic/chat/${chatId}`, (message) => {
          try {
            const receivedMessage = JSON.parse(message.body);

            if (
              !receivedMessage ||
              !receivedMessage.content ||
              !receivedMessage.dateTime
            ) {
              return;
            }

            if (receivedMessage.userId === userId) {
              return;
            }

            // messageId가 없는 경우 fallback으로 유니크한 식별자 생성
            const messageId =
              receivedMessage.messageId ||
              `${receivedMessage.userId}_${receivedMessage.dateTime}`;

            if (processedMsgIds.current.has(messageId)) return;
            processedMsgIds.current.add(messageId);

            addMessage({
              nickname: receivedMessage.nickname,
              isMe: receivedMessage.userId === userId,
              isOwner: receivedMessage.isOwner,
              content: receivedMessage.content,
              dateTime: receivedMessage.dateTime,
            });
          } catch (e) {
            console.error("메시지 처리 중 오류 발생:", e);
            Sentry.captureException(e);
          }
        });
      },
      onStompError: () => {
        setIsConnected(false);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      if (client.active) client.deactivate();
    };
  }, [chatId, addMessage, userId]); // processedMsgIds 제거됨

  const sendMessage = useCallback(
    (message: string, jwtToken: string | null) => {
      if (!message.trim() || !stompClient?.connected || !chatId) return false;
      if (!jwtToken) return false;

      try {
        stompClient.publish({
          destination: `/app/chat/${chatId}`,
          body: message,
          headers: { Authorization: `Bearer ${jwtToken}` },
        });

        addMessage({
          isMe: true,
          content: message,
          dateTime: (() => {
            const now = new Date();
            now.setHours(now.getHours());
            return now.toISOString();
          })(),
        });

        return true;
      } catch (e) {
        console.error("메시지 전송 중 오류 발생:", e);
        Sentry.captureException(e);
        return false;
      }
    },
    [stompClient, chatId, addMessage]
  );

  return {
    isConnected,
    sendMessage,
  };
};
