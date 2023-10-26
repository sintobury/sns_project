import { useState } from "react";
import * as webstomp from "webstomp-client";

export const useWebsocket = () => {
  const [client, setClient] = useState<webstomp.Client | null>(null);

  // useEffect(() => {
  const webSocketUrl = process.env.REACT_APP_WEB_SOCKET_URL;
  const socket = new WebSocket(`${webSocketUrl}/ws/chat`);
  const stompClient = webstomp.over(socket);
  const headers = {
    accessToken: localStorage.getItem("accessToken") as string,
  };
  const connectWebsocket = () => {
    stompClient.connect(headers, () => {
      stompClient.subscribe(`${process.env.REACT_APP_WEB_SOCKET_URL}/user/topic/data`, () => {
        console.log("websocket connected");
      });
    });
    setClient(stompClient);
  };

  const disconnect = () => {
    stompClient.disconnect(() => {
      console.log("websocket disconnected");
    });
  };
  // }, []);

  return { client, connectWebsocket, disconnect };
};
