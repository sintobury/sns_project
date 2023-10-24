import webstomp from "webstomp-client";

export const useWebsocket = () => {
  const socket = new WebSocket(`${process.env.REACT_APP_WEB_SOCKET_URL}/ws/chat`);
  const stompClient = webstomp.over(socket);
  const headers = {
    accessToken: localStorage.getItem("accessToken") as string,
  };
  stompClient.connect(headers, () => {
    stompClient.subscribe(`${process.env.REACT_APP_WEB_SOCKET_URL}/user/topic/data`, () => {
      console.log("websocket connected");
    });
  });
  return stompClient;
};
