import { useState } from "react";
import Button from "../Common/Button/Button";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import StarIcon from "@mui/icons-material/Star";
import "./Sidebar.css";
import { yellow } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [mode, setMode] = useState("home");
  const navigate = useNavigate();
  const navigateMain = () => {
    setMode("home");
    navigate("/main");
  };

  return (
    <div className="sidebar_container">
      <div className="sidebar_button_container">
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
      {mode === "friendList" ? <div className="friend_list">{/*친구목록*/}</div> : null}
      {mode === "bookmarkList" ? (
        <div className="bookmark_list">{/*북마크 채팅방리스트*/}</div>
      ) : null}
    </div>
  );
};

export default Sidebar;
