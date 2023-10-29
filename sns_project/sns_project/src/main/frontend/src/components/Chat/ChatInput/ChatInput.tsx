import "./ChatInput.css";
import { ChangeEvent, useState } from "react";
import Button from "../../Common/Button/Button";
import { useWebsocket } from "../../../hook/useWebsocket";
import { useGetLoginUserinfo } from "../../../hook/useGetLoginUserinfo";

interface childProps {
  roomId: string;
}

const ChatInput = ({ roomId }: childProps) => {
  const [message, setMessage] = useState<string>("");
  const { username, name } = useGetLoginUserinfo();
  const { stompClient } = useWebsocket();
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
    if (stompClient) {
      stompClient.send(`/app/message/sendToRoom/send`, JSON.stringify(socketMessage), {});
      console.log("실행됨");
    }
    setMessage("");
  };

  const sendMessageByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  return (
    <div className="chat_input_container">
      <input
        className="chat_input"
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
