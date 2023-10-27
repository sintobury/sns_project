import "./FriendList.css";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { grey } from "@mui/material/colors";
import { RootState } from "../../../../redux";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { authInstance } from "../../../../interceptors/interceptors";
import { useNavigate } from "react-router-dom";

interface ResponseDTO {
  statusCode: string;
  message: string;
  result: FriendDTO[];
}

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

const FriendList = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const loginuserId = useSelector((state: RootState) => state.loginSlice.id);
  const loginUserName = useSelector((state: RootState) => state.loginSlice.username);
  const [openidx, setOpenidx] = useState([false]);
  const navigate = useNavigate();

  const getFriendList = async () => {
    const res = await authInstance.get("/friend");
    console.log(res.data);
    return res.data;
  };

  const friendlistData = useQuery<ResponseDTO>(["friendList", loginuserId], getFriendList, {
    staleTime: Infinity,
  });

  const navigateProfile = (username: string) => {
    navigate(`/profile?username=${username}`);
  };

  const makeChatroom = async (friend: FriendDTO) => {
    const participants = [loginuserId, friend.member.id];
    const roomdata = {
      username: participants,
      roomID: `${loginUserName}${friend.member.username}`,
      roomName: friend.member.name,
    };
    const res = await authInstance.post(`/room`, roomdata);
    if (res.data.statusCode === 200) {
      console.log(res.data.message);
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
  return (
    <div className={`friendlist_container ${isDarkmode && "darkmode"}`}>
      <p className="component_title">친구 목록</p>
      {friendlistData.isLoading ? null : (
        <div className="user_container" ref={MenuRef}>
          {friendlistData.data?.result.map((el: FriendDTO, idx) => (
            <div className={`user ${isDarkmode && "darkmode"}`} key={el.member.username}>
              <div className="user_info_container">
                <img className="profile_img" src={el.member.imgurl} alt="user_img" />
                <p className="user_name">{el.member.name}</p>
              </div>
              <div className="user_button_container" onClick={() => openMenu(idx)}>
                {isDarkmode ? <MenuIcon sx={{ color: grey[500] }} /> : <MenuIcon />}
                {openidx[idx] && (
                  <div className={`user_interaction_button_container ${isDarkmode && "darkmode"}`}>
                    <div
                      className="user_interaction_button"
                      onClick={() => navigateProfile(el.member.username)}
                    >
                      프로필
                    </div>
                    <div className="user_interaction_button" onClick={() => makeChatroom(el)}>
                      채팅하기
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendList;
