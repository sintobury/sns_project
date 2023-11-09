import { useDispatch, useSelector } from "react-redux";
import "./ChatList.css";
import { RootState } from "../../../../redux";
import { setRoom } from "../../../../redux/reducers/chatRoomSlice";
import { useGetRoomList } from "../../../../hook/useGetRoomList";

interface room {
  roomId: string;
  roomName: string;
  usernames: string[];
  img?: string;
}

const ChatList = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const { roomList } = useGetRoomList();
  const dispatch = useDispatch();

  const openChatroom = (roomdata: room) => {
    dispatch(setRoom(roomdata));
  };
  return (
    <div className={`chatlist_container ${isDarkmode && "darkmode"}`}>
      <p className="component_title">채팅방 목록</p>
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
          <img alt="chatroom_img" src={el.img}></img>
          <p className="room_title">{el.roomName}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
