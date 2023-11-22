import "./FriendList.css";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { grey } from "@mui/material/colors";
import { RootState } from "../../../../redux";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { authInstance } from "../../../../interceptors/interceptors";
import { useNavigate } from "react-router-dom";
import { setRoom } from "../../../../redux/reducers/chatRoomSlice";
import Loading from "../../../Common/Loading/Loading";
import { useGetFriendList } from "../../../../hook/useGetFriendList";
import { useGetRoomList } from "../../../../hook/useGetRoomList";
import { useQueryClient } from "@tanstack/react-query";

interface childProps {
  setMode: Dispatch<SetStateAction<string>>;
}

interface FriendDTO {
  id: number;
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
  profile: FileDTO;
}
interface FileDTO {
  id: number;
  path: string;
  name: string;
  type: string;
  size: number;
}

const FriendList = ({ setMode }: childProps) => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const loginUserName = useSelector((state: RootState) => state.loginSlice.username);
  const loginuserId = useSelector((state: RootState) => state.loginSlice.id);
  const [openidx, setOpenidx] = useState([false]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { friendlistData } = useGetFriendList(loginuserId);
  const { roomList } = useGetRoomList();
  const queryClient = useQueryClient();

  const navigateProfile = (username: string) => {
    const newArr = new Array(friendlistData.data?.result.length).fill(false);
    setOpenidx(newArr);
    navigate(`/profile?username=${username}`);
  };

  const makeChatroom = async (friend: FriendDTO) => {
    const existRoom = roomList.data?.result.find(
      (el) => el.usernames.includes(friend.member.username) && el.usernames.length === 2,
    );

    if (existRoom) {
      dispatch(setRoom(existRoom));
    } else {
      const participants = [loginUserName, friend.member.username];
      const roomdata = {
        usernames: participants,
        roomId: `${loginUserName}${friend.member.username}`,
        roomName: friend.member.name,
      };
      const res = await authInstance.post(`/room`, roomdata);
      if (res.data.statusCode === 200) {
        console.log(res.data.message);
        dispatch(setRoom(res.data.result));
        const newArr = new Array(friendlistData.data?.result.length).fill(false);
        setOpenidx(newArr);
      }
    }
  };

  const cancleFriend = async (id: number) => {
    const res = await authInstance.delete(`/friend`, {
      data: { id: id },
    });
    if (res.data.statusCode === 200) {
      alert(res.data.message);
      queryClient.refetchQueries(["friendList", loginuserId, loginUserName]);
    }
  };

  const openMenu = (idx: number) => {
    const newArr = new Array(friendlistData.data?.result.length).fill(false);
    newArr[idx] = true;
    setOpenidx(newArr);
  };

  const MenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (MenuRef.current && !MenuRef.current.contains(e.target as Node)) {
        const newArr = new Array(friendlistData.data?.result.length).fill(false);
        setOpenidx(newArr);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [MenuRef, friendlistData]);

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
    <div className={`friendlist_container ${isDarkmode && "darkmode"}`} ref={ContainerRef}>
      <p className="component_title">친구 목록</p>
      {friendlistData.isLoading ? (
        <Loading />
      ) : (
        <div className="user_container" ref={MenuRef}>
          {friendlistData.data?.result.length === 0 ? (
            <p className="empty_message">등록된 친구가 없습니다.</p>
          ) : (
            friendlistData.data?.result.map((el: FriendDTO, idx) => (
              <div className={`user ${isDarkmode && "darkmode"}`} key={el.member.username}>
                <div className="user_info_container">
                  <img className="profile_img" src={el.member.profile.path} alt="user_img" />
                  <p className="user_name">{el.member.name}</p>
                </div>
                <div className="user_button_container" onClick={() => openMenu(idx)}>
                  {isDarkmode ? <MenuIcon sx={{ color: grey[800] }} /> : <MenuIcon />}
                  {openidx[idx] && (
                    <div
                      className={`user_interaction_button_container ${isDarkmode && "darkmode"}`}
                    >
                      <div
                        className="user_interaction_button"
                        onClick={() => navigateProfile(el.member.username)}
                      >
                        프로필
                      </div>
                      <div className="user_interaction_button" onClick={() => makeChatroom(el)}>
                        채팅하기
                      </div>
                      <div className="user_interaction_button" onClick={() => cancleFriend(el.id)}>
                        친구삭제
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FriendList;
