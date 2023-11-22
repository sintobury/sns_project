import { useDispatch, useSelector } from "react-redux";
import "./ChatList.css";
import { RootState } from "../../../../redux";
import { setRoom } from "../../../../redux/reducers/chatRoomSlice";
import { useGetRoomList } from "../../../../hook/useGetRoomList";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface childProps {
  setMode: Dispatch<SetStateAction<string>>;
}

interface room {
  roomId: string;
  roomName: string;
  usernames: string[];
  img?: string;
}

const ChatList = ({ setMode }: childProps) => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const { roomList } = useGetRoomList();
  const dispatch = useDispatch();

  const openChatroom = (roomdata: room) => {
    dispatch(setRoom(roomdata));
  };

  const ContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (ContainerRef.current && !ContainerRef.current.contains(e.target as Node)) {
        setMode("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ContainerRef]);

  return (
    <div className={`chatlist_container ${isDarkmode && "darkmode"}`} ref={ContainerRef}>
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
          <p className="room_title">{el.roomName}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
