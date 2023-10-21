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
  const [searchKeyword, setSearchKeyword] = useState("");
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);

  const moveAdd = () => {
    if (mode !== "addFriend") {
      setMode("addFriend");
      setSearchKeyword("");
    }
  };
  const getFriendList = async () => {
    const res = await authInstance.get("/friend");
    return res.data;
  };
  const getSearchFriendList = async () => {
    if (searchKeyword === "") {
      const res = await authInstance.get(`/member/search`);
      return res.data;
    }

    const res = await authInstance.get(`/member/search/${searchKeyword}`);
    return res.data;
  };

  const friendlistData = useQuery<ResponseDTO>(["friendList"], getFriendList, {
    staleTime: Infinity,
  });

  const friendSearchData = useQuery<ResponseDTO>(["searchFriendList"], getSearchFriendList, {
    staleTime: Infinity,
  });
  console.log({ 1: friendSearchData.data, 2: friendlistData.data });
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
      {mode === "addFriend" && (
        <div className={`add_friend_container ${isDarkmode && "darkmode"}`}>
          <p className="component_title">친구 추가</p>
          <div className="add_friend_search_container">
            <input
              className="add_friend_input"
              placeholder="이름"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Button
              type="button"
              text="검색"
              design="black"
              onClick={() => friendSearchData.refetch()}
            />
          </div>
          {friendSearchData.isLoading ? null : (
            <div className="user_container">
              {friendSearchData.data?.result.map((el: MemberDTO) => (
                <div className={`friend ${isDarkmode && "darkmode"}`}>
                  <img className="profile_img" src={el.imgurl} alt="profile_img" />
                  <p className="friend_name">{el.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
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
