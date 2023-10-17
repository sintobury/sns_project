import "./chatroom.css";
import Button from "../Common/Button/Button";

const Chatroom = () => {
  return (
    <div className="chatroom_container">
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
