import { useState, useEffect, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import { useChatStore } from "./useChat";

interface UseChatSocketProps {
  chatId: string | null;
  userId: string | null;
}

export const useChatSocket = ({ chatId, userId }: UseChatSocketProps) => {
  const { addMessage } = useChatStore();
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [processedMsgIds] = useState(new Set<string>());

  useEffect(() => {
    if (!chatId) return;
    const jwtToken = localStorage.getItem("accessToken");
    if (!jwtToken) return;

    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
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
    (message: string) => {
      if (!message.trim() || !stompClient?.connected || !chatId) return false;
      const jwtToken = localStorage.getItem("accessToken");
      if (!jwtToken) return false;

      stompClient.publish({
        destination: `/app/chat/${chatId}`,
        body: message,
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      addMessage({
        nickname: "나",
        isMe: true,
        isOwner: false,
        content: message,
        dateTime: new Date().toISOString(),
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
