import { useState } from "react";
import Button from "../Common/Button/Button";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
// import StarIcon from "@mui/icons-material/Star";
import ChatBubble from "@mui/icons-material/ChatBubble";
import "./Sidebar.css";
// import { yellow } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { useQueryClient } from "@tanstack/react-query";
import Addfriend from "./SidebarComponents/AddFriend/Addfriend";
import RequestedFriend from "./SidebarComponents/RequestedFriend/RequestedFriend";
import FriendList from "./SidebarComponents/FriendList/FriendList";
import ChatList from "./SidebarComponents/ChatList/ChatList";

const Sidebar = () => {
  const [mode, setMode] = useState("addFriend");
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const queryClient = useQueryClient();
  const moveAdd = () => {
    if (mode !== "addFriend") {
      queryClient.invalidateQueries(["searchFriendList"]);
      setMode("addFriend");
    }
  };

  return (
    <div className="sidebar_container">
      <div className={`sidebar_button_container ${isDarkmode && "darkmode"}`}>
        <Button
          icon={<HomeIcon sx={{ color: "#70e15e" }} />}
          text="전체 유저"
          type="button"
          onClick={moveAdd}
        />
        <Button
          icon={<GroupIcon sx={{ color: "#52a445" }} />}
          text="친구 요청 목록"
          type="button"
          onClick={() => setMode("requestedFriend")}
        />
        <Button
          icon={<GroupIcon color="primary" />}
          text="친구 목록"
          type="button"
          onClick={() => setMode("friendList")}
        />
        <Button
          icon={<ChatBubble sx={{ color: "#70e15e" }} />}
          text="채팅 목록"
          type="button"
          onClick={() => setMode("chatList")}
        />
      </div>
      {mode === "addFriend" && <Addfriend />}
      {mode === "requestedFriend" && <RequestedFriend />}
      {mode === "friendList" && <FriendList />}
      {mode === "chatList" && <ChatList />}
    </div>
  );
};

export default Sidebar;
