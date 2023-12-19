import { useEffect, useState } from "react";
import * as webstomp from "webstomp-client";

interface messages {
  sender: string;
  senderName: string;
  roomId: string;
  message: string;
}

export const useWebsocket = () => {
  const [client, setClient] = useState<webstomp.Client | null>(null);
  const [messages, setMessages] = useState<messages | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const webSocketUrl = process.env.REACT_APP_WEB_SOCKET_URL;
  const socket = new WebSocket(`${webSocketUrl}/ws/chat`);
  const stompClient = webstomp.over(socket);
  const headers = {
    accessToken: localStorage.getItem("accessToken") as string,
  };
  const connectWebsocket = () => {
    stompClient.connect(headers, () => {
      setIsConnected(true);
      console.log("websocket connected");
      stompClient.subscribe(`/user/topic/data`, (message) => {
        setMessages(JSON.parse(message.body));
      });
    });
    setClient(stompClient);
  };

  const disconnect = () => {
    stompClient.disconnect(() => {
      console.log("websocket disconnected");
      setIsConnected(false);
    });
  };
  useEffect(() => {
    connectWebsocket();
  }, []);

  return { stompClient, client, connectWebsocket, disconnect, messages, isConnected };
};
