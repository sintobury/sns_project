import { useDispatch, useSelector } from "react-redux";
import "./ChatList.css";
import { RootState } from "../../../../redux";
import { authInstance } from "../../../../interceptors/interceptors";
import { useQuery } from "@tanstack/react-query";
import { setRoom } from "../../../../redux/reducers/chatRoomSlice";

interface ResponseDTO {
  statusCode: string;
  message: string;
  result: room[];
}

interface room {
  roomId: string;
  roomName: string;
  usernames: string[];
  img?: string;
}

const ChatList = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const loginUsername = useSelector((state: RootState) => state.loginSlice.username);
  const dispatch = useDispatch();

  const getRoomList = async () => {
    const res = await authInstance.get(`/room/${loginUsername}`);
    return res.data;
  };
  const roomList = useQuery<ResponseDTO>(["roomlist", loginUsername], getRoomList);

  const openChatroom = (roomdata: room) => {
    dispatch(setRoom(roomdata));
  };
  console.log(roomList.data);
  return (
    <div className={`chatlist_container ${isDarkmode && "darkmode"}`}>
      {roomList.data?.result.length === 0 && (
        <div>
          <p className="explain">채팅 목록이 없습니다.</p>
        </div>
      )}
      {roomList.data?.result.map((el) => (
        <div
          className={`room_info ${isDarkmode && "darkmode"}`}
          onClick={() => openChatroom(el)}
          key={el.roomId}
        >
          <img alt="chatroom_representive_img" src={el.img}></img>
          <p className="room_title">{el.roomName}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
