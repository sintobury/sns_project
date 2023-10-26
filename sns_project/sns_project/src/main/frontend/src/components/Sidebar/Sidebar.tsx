import { useState } from "react";
import Button from "../Common/Button/Button";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import StarIcon from "@mui/icons-material/Star";
import "./Sidebar.css";
import { yellow } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { authInstance } from "../../interceptors/interceptors";
import { useQuery } from "@tanstack/react-query";
import Addfriend from "./SidebarComponents/AddFriend/Addfriend";
import RequestedFriend from "./SidebarComponents/RequestedFriend/RequestedFriend";

interface ResponseDTO {
  statusCode: string;
  message: string;
  result: MemberDTO[];
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

const Sidebar = () => {
  const [mode, setMode] = useState("addFriend");
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const moveAdd = () => {
    if (mode !== "addFriend") {
      setMode("addFriend");
    }
  };

  const getFriendList = async () => {
    const res = await authInstance.get("/friend");
    return res.data;
  };

  const friendlistData = useQuery<ResponseDTO>(["friendList"], getFriendList, {
    staleTime: Infinity,
  });

  console.log({ 2: friendlistData.data });

  return (
    <div className="sidebar_container">
      <div className={`sidebar_button_container ${isDarkmode && "darkmode"}`}>
        <Button
          icon={<HomeIcon sx={{ color: "#70e15e" }} />}
          text="친구추가"
          type="button"
          onClick={moveAdd}
        />
        <Button
          icon={<GroupIcon color="primary" />}
          text="친구 요청 목록"
          type="button"
          onClick={() => setMode("requestedFriend")}
        />
        <Button
          icon={<GroupIcon color="primary" />}
          text="친구목록"
          type="button"
          onClick={() => setMode("friendList")}
        />
        <Button
          icon={<StarIcon sx={{ color: yellow[700] }} />}
          text="즐겨찾기"
          type="button"
          onClick={() => setMode("bookmarkList")}
        />
      </div>
      {mode === "addFriend" && <Addfriend />}
      {mode === "requestedFriend" && <RequestedFriend />}
      {mode === "friendList" && (
        <div className={`friend_list ${isDarkmode && "darkmode"}`}>
          <p className="component_title">친구목록</p>
          {friendlistData.isLoading ? null : (
            <div className="friendlist_container">
              {friendlistData.data?.result.length === 0
                ? null
                : friendlistData.data?.result.map((el: MemberDTO) => (
                    <div className="friend">
                      <img className="profile_img" src={el.imgurl} alt="profile_img" />
                      <p className="friend_Id">{el.username}</p>
                    </div>
                  ))}
            </div>
          )}
        </div>
      )}
      {mode === "bookmarkList" && (
        <div className={`bookmark_list ${isDarkmode && "darkmode"}`}>
          <p className="component_title">즐겨찾기</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
