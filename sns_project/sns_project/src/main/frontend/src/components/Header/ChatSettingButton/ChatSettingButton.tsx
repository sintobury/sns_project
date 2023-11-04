import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./ChatSettingButton.css";
import Button from "../../Common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { authInstance } from "../../../interceptors/interceptors";
import { setRoom } from "../../../redux/reducers/chatRoomSlice";
import { useGetRoomList } from "../../../hook/useGetRoomList";
import { useGetFriendList } from "../../../hook/useGetFriendList";

interface FriendDTO {
  id: string;
  member: MemberDTO;
  request: boolean;
  state: string;
  list: MemberDTO[];
}

interface MemberDTO {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  birth: string;
  createdAt: string;
  provider: string;
  imgurl: string;
}

const ChatSettingButton = () => {
  const [openSetting, setOpenSetting] = useState(false);
  const [title, setTitle] = useState("");
  const [chatmember, setChatmember] = useState<string[]>([]);
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const loginUserName = useSelector((state: RootState) => state.loginSlice.username);
  const dispatch = useDispatch();
  const { friendlistData } = useGetFriendList();
  const { roomList } = useGetRoomList();

  const handleCheck = (e: ChangeEvent<HTMLInputElement>, username: string) => {
    if (e.target.checked) {
      setChatmember([...chatmember, username]);
    } else if (!e.target.checked) {
      setChatmember(chatmember.filter((el) => el !== username));
    }
  };

  const makeChatRoom = async () => {
    const existRoom = roomList.data?.result.find(
      (el) => chatmember.every((member) => el.usernames.includes(member)) && title === el.roomName,
    );
    if (!existRoom && title !== "") {
      const participants = [loginUserName, ...chatmember];
      const roomdata = {
        usernames: participants,
        roomId: title,
        roomName: title,
      };
      const res = await authInstance.post(`/room`, roomdata);
      if (res.data.statusCode === 200) {
        console.log(res.data.message);
        dispatch(setRoom(res.data.result));
        setOpenSetting(false);
      } else {
        console.log(res.data.message);
      }
    }
  };

  const chatMakerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (chatMakerRef.current && !chatMakerRef.current.contains(e.target as Node)) {
        setOpenSetting(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [chatMakerRef]);
  return (
    <div className="set_chat_container" ref={chatMakerRef}>
      <Button
        onClick={() => setOpenSetting(!openSetting)}
        text="채팅방 추가"
        type="button"
        design="black"
      />
      {openSetting && (
        <div className={`options_container ${isDarkmode && "darkmode"}`}>
          <div className="chatroom_name">
            <input
              className="chatroom_title_input"
              placeholder="채팅방 이름"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <Button text="만들기" type="button" design="black" onClick={makeChatRoom} />
          </div>
          <div className={`friend_list_container ${isDarkmode && "darkmode"}`}>
            {friendlistData.data?.result.map((el: FriendDTO) => (
              <div className={`user ${isDarkmode && "darkmode"}`} key={el.member.username}>
                <div className="user_info_container">
                  <img className="profile_img" src={el.member.imgurl} alt="user_img" />
                  <p className="user_name">{el.member.name}</p>
                  <input
                    type="checkbox"
                    className="chat_member_checkbox"
                    onChange={(e) => handleCheck(e, el.member.username)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ChatSettingButton;
