import { useState, useEffect, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import { useChatStore } from "./useChat";

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
  const [processedMsgIds] = useState(new Set<string>());

  useEffect(() => {
    if (!chatId) return;
    if (!jwtToken) return;

    const client = new Client({
      brokerURL: "wss://dev-api.modie.site/wss",
      // brokerURL: "ws://localhost:8080/wss",
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

            if (processedMsgIds.has(receivedMessage.chatId)) return;
            processedMsgIds.add(receivedMessage.chatId);

            addMessage({
              nickname: receivedMessage.nickname,
              isMe: receivedMessage.userId === userId,
              isOwner: receivedMessage.isOwner,
              content: receivedMessage.content,
              dateTime: receivedMessage.dateTime,
            });
          } catch (error) {
            console.log(error);
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
  }, [chatId, addMessage, userId, processedMsgIds]);

  const sendMessage = useCallback(
    (message: string, jwtToken: string | null) => {
      if (!message.trim() || !stompClient?.connected || !chatId) return false;
      if (!jwtToken) return false;

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
          now.setHours(now.getHours() - 9);
          return now.toISOString();
        })(),
      });

      return true;
    },
    [stompClient, chatId, addMessage]
  );

  return {
    isConnected,
    sendMessage,
  };
};
