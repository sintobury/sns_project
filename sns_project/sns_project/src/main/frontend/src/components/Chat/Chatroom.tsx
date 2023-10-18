import "./chatroom.css";
import Button from "../Common/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

const Chatroom = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);

  return (
    <div className={`chatroom_container ${isDarkmode && "darkmode"}`}>
      <div className="close_button_container">
        <Button type="button" text="X" design="black" />
      </div>
      <div className="chatroom_settings">
        <img alt="chatroom_representive_img"></img>
        <p className="chatroom_title">채팅방 이름</p>
      </div>
      <div className="chat_message_container"></div>
      <div className="chat_send_container">
        <input className="chat_input"></input>
        <Button type="button" text="전송" design="green" />
      </div>
    </div>
  );
};

export default Chatroom;
