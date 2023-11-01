import "./ChatInput.css";
import { ChangeEvent, useState } from "react";
import Button from "../../Common/Button/Button";
import { useGetLoginUserinfo } from "../../../hook/useGetLoginUserinfo";
import { useQueryClient } from "@tanstack/react-query";
import { useWebsocket } from "../../../hook/useWebsocket";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";

const ChatInput = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const roomId = useSelector((state: RootState) => state.chatRoomSlice.roomId);
  const [message, setMessage] = useState<string>("");
  const queryClient = useQueryClient();
  const { client, isConnected } = useWebsocket();
  const { username, name } = useGetLoginUserinfo();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (message?.trim() === "") {
      return;
    }
    const socketMessage = {
      sender: username,
      senderName: name,
      roomId: roomId,
      message: message,
    };
    // 실재 채팅 전송 함수 실행
    if (client && isConnected) {
      client.send(`/app/message/sendToRoom/send`, JSON.stringify(socketMessage), {});
    }
    setMessage("");
    setTimeout(() => {
      queryClient.refetchQueries(["chattings"]);
    }, 1000);
  };

  const sendMessageByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      sendMessage();
    }
  };
  return (
    <div className={`chat_input_container ${isDarkmode && "darkmode"}`}>
      <input
        className={`chat_input ${isDarkmode && "darkmode"}`}
        type="text"
        placeholder="메세지를 입력해주세요."
        value={message}
        onChange={handleInput}
        onKeyDown={sendMessageByEnter}
      />
      <Button text="전송" type="button" design="green" onClick={sendMessage} />
    </div>
  );
};

export default ChatInput;
