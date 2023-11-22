import { useState } from "react";
import Button from "../Common/Button/Button";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import ChatBubble from "@mui/icons-material/ChatBubble";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { useQueryClient } from "@tanstack/react-query";
import Addfriend from "./SidebarComponents/AddFriend/Addfriend";
import RequestedFriend from "./SidebarComponents/RequestedFriend/RequestedFriend";
import FriendList from "./SidebarComponents/FriendList/FriendList";
import ChatList from "./SidebarComponents/ChatList/ChatList";

const Sidebar = () => {
  const [mode, setMode] = useState("");
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const loginUserId = useSelector((state: RootState) => state.loginSlice.id);
  const loginUsername = useSelector((state: RootState) => state.loginSlice.username);
  const queryClient = useQueryClient();
  const moveAdd = () => {
    if (mode === "addFriend") {
      setMode("");
    } else {
      queryClient.refetchQueries(["searchFriendList", loginUserId]);
      setMode("addFriend");
    }
  };

  const moveReq = () => {
    if (mode === "requestedFriend") {
      setMode("");
    } else {
      queryClient.refetchQueries(["requestedFriendList", loginUserId]);
      setMode("requestedFriend");
    }
  };

  const moveChatroom = () => {
    if (mode === "chatList") {
      setMode("");
    } else {
      queryClient.refetchQueries(["roomlist", loginUsername]);
      setMode("chatList");
    }
  };

  const moveFriend = () => {
    if (mode === "friendList") {
      setMode("");
    } else {
      queryClient.refetchQueries(["friendList", loginUserId, loginUsername]);
      setMode("friendList");
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
          onClick={moveReq}
        />
        <Button
          icon={<GroupIcon color="primary" />}
          text="친구 목록"
          type="button"
          onClick={moveFriend}
        />
        <Button
          icon={<ChatBubble sx={{ color: "#70e15e" }} />}
          text="채팅 목록"
          type="button"
          onClick={moveChatroom}
        />
      </div>
      {mode === "addFriend" && <Addfriend setMode={setMode} />}
      {mode === "requestedFriend" && <RequestedFriend setMode={setMode} />}
      {mode === "friendList" && <FriendList setMode={setMode} />}
      {mode === "chatList" && <ChatList setMode={setMode} />}
    </div>
  );
};

export default Sidebar;
