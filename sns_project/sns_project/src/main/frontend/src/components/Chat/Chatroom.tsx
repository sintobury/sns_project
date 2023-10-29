import "./Chatroom.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import ChatInput from "./ChatInput/ChatInput";
import Chattings from "./Chattings/Chattings";

const Chatroom = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const { roomId, roomName } = useSelector((state: RootState) => state.chatRoomSlice);
  if (roomName === "") {
    return null;
  }
  return (
    <div className={`chatroom_container ${isDarkmode && "darkmode"}`}>
      <div className={`chatroom_settings ${isDarkmode && "darkmode"}`}>
        <img alt="chatroom_representive_img"></img>
        <p className="chatroom_title">{roomName}</p>
      </div>
      <Chattings roomId={roomId} />
      <ChatInput roomId={roomId} />
    </div>
  );
};

export default Chatroom;
