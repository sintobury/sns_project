import { useState } from "react";
import Button from "../Common/Button/Button";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import StarIcon from "@mui/icons-material/Star";
import "./Sidebar.css";
import { yellow } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { authInstance } from "../../interceptors/interceptors";
import { useQuery } from "@tanstack/react-query";

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
  const [mode, setMode] = useState("home");
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const navigate = useNavigate();
  const navigateMain = () => {
    setMode("home");
    navigate("/main");
  };
  const getFriendList = async () => {
    const res = await authInstance.get("/friend");
    return res.data;
  };

  const friendlistData = useQuery<ResponseDTO>(["friendList"], getFriendList, {
    staleTime: Infinity,
  });
  return (
    <div className="sidebar_container">
      <div className={`sidebar_button_container ${isDarkmode && "darkmode"}`}>
        <Button
          icon={<HomeIcon sx={{ color: "#70e15e" }} />}
          text="메인으로"
          type="button"
          onClick={navigateMain}
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
      {mode === "friendList" && (
        <div className={`friend_list ${isDarkmode && "darkmode"}`}>
          <p className="component_title">친구목록</p>
          {friendlistData.isLoading !== true &&
            friendlistData.data?.result.length !== 0 &&
            friendlistData.data?.result.map((el: MemberDTO) => (
              <div className="friend">
                <img className="profile_img" src={el.imgurl} alt="profile_img" />
                <p className="friend_Id">{el.username}</p>
              </div>
            ))}
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
