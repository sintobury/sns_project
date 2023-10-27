import "./chatroom.css";
import Button from "../Common/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import ChatInput from "./ChatInput/ChatInput";

interface room {
  username: string[];
  roomID: string;
  roomName: string;
}

const Chatroom = (roomData: room) => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const roomId = roomData.roomID;
  const roomName = roomData.roomName;
  return (
    <div className={`chatroom_container ${isDarkmode && "darkmode"}`}>
      <div className="close_button_container">
        <Button type="button" text="X" design="black" />
      </div>
      <div className="chatroom_settings">
        <img alt="chatroom_representive_img"></img>
        <p className="chatroom_title">{roomName}</p>
      </div>
      <div className="chat_message_container"></div>
      <ChatInput roomId={roomId} />
    </div>
  );
};

export default Chatroom;
