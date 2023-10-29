import { useSelector } from "react-redux";
import { useWebsocket } from "../../../hook/useWebsocket";
import "./Chattings.css";
import { RootState } from "../../../redux";

interface childProps {
  roomId: string;
}

const Chattings = ({ roomId }: childProps) => {
  const loginUser = useSelector((state: RootState) => state.loginSlice.username);
  const { messages, messageList } = useWebsocket();
  if (roomId === messages?.roomId) {
    // setMessageList([...messageList, messages]);
    console.log(messageList);
  }
  return (
    <div className="chatting_container">
      {messageList.map((el, idx) => (
        <div className="chatting" key={idx}>
          {el.sender === loginUser ? (
            <p className="login_user_message">{el.message}</p>
          ) : (
            <p className="other_message">{el.message}</p>
          )}
        </div>
      ))}
      <div className="chatting">
        {messages?.sender === loginUser ? (
          <p className="login_user_message">{messages.message}</p>
        ) : (
          <p className="other_message">{messages?.message}</p>
        )}
      </div>
    </div>
  );
};

export default Chattings;
