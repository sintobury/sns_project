import "./Chatroom.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import ChatInput from "./ChatInput/ChatInput";
import Chattings from "./Chattings/Chattings";
import { resetRoom } from "../../redux/reducers/chatRoomSlice";

const Chatroom = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const { roomName } = useSelector((state: RootState) => state.chatRoomSlice);
  const dispatch = useDispatch();
  const closeChatroom = () => {
    dispatch(resetRoom());
  };
  if (roomName === "") {
    return null;
  }
  return (
    <div className={`chatroom_container ${isDarkmode && "darkmode"}`}>
      <div className={`chatroom_settings ${isDarkmode && "darkmode"}`}>
        <img alt="chatroom_img"></img>
        <p className="chatroom_title">{roomName}</p>
        <div className="close_button_container">
          <button className={`close_button ${isDarkmode && "darkmode"}`} onClick={closeChatroom}>
            X
          </button>
        </div>
      </div>
      <Chattings />
      <ChatInput />
    </div>
  );
};

export default Chatroom;
