import "./Profile.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { authInstance } from "../../interceptors/interceptors";
import { useQuery } from "@tanstack/react-query";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Summary from "../../components/ProfileTab/Summary/Summary";
import MediaList from "../../components/ProfileTab/MediaList/MediaList";
import Friend from "../../components/ProfileTab/Friend/Friend";
import ProfilePostList from "../../components/ProfileTab/ProfilePostList/ProfilePostList";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import Chatroom from "../../components/Chat/Chatroom";
import Button from "../../components/Common/Button/Button";
import { FormEvent } from "react";

interface ResponseDTO {
  statusCode: string;
  message: string;
  result: MemberDTO;
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
}

const Profile = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const loginusername = useSelector((state: RootState) => state.loginSlice.username);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");
  console.log(username);
  const tabmenulist = [
    { name: "프로필", value: "" },
    { name: "정보", value: "info" },
    { name: "친구", value: "friend" },
    { name: "사진 및 동영상", value: "media" },
  ];
  const tabMenu = searchParams.get("tabmenu");
  const submitImg = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const file = target.profile_img.files[0];
    const form = new FormData();
    form.append("file", file);
    const res = await authInstance.post(`/member/profile`, form, {
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    });
    console.log(res.data);
  };
  // const getuserProfileImg = async () => {
  //   const res = await authInstance.get(`/member/profile`);
  //   return res.data;
  // };
  const getUserInfo = async () => {
    try {
      if (username) {
        const res = await authInstance.get(`/member/info/${username}`);
        return res.data;
      } else {
        const res = await authInstance.get("/member/info");
        return res.data;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  const handleProfileTab = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const menu = tabmenulist.find((el) => el.name === target.innerText)?.value;
    if (menu === "") {
      navigate(`/profile`);
    } else {
      navigate(`/profile?tabmenu=${menu}`);
    }
  };

  const { isLoading, data: profileData } = useQuery<ResponseDTO>(
    ["profileData", loginusername],
    getUserInfo,
    {
      staleTime: Infinity,
    },
  );
  console.log(profileData);
  return (
    <div className={`profile_page ${isDarkmode && "darkmode"}`}>
      <Header />
      <div className="main_content_container">
        <Sidebar />
        {isLoading ? null : (
          <div className="profile_container">
            <div className={`profile_summary_container ${isDarkmode && "darkmode"}`}>
              <div className={`profile_img_container ${isDarkmode && "darkmode"}`}>
                <img className="profile_img" id="user_profile_img" alt="user_img"></img>
                <label htmlFor="user_profile_img" className={`label ${isDarkmode && "darkmode"}`}>
                  {profileData?.result.name}
                </label>
              </div>
              {username === null && (
                <form onSubmit={(e) => submitImg(e)} encType="multipart/form-data">
                  <input id="profile_img" type="file" accept="image/*" name="profile_img" />
                  <Button type="submit" text="저장" design="black" />
                </form>
              )}
              <div className="profile_tab_container">
                {tabmenulist.map((el) => (
                  <div
                    className={`tab_menu ${isDarkmode && "darkmode"}`}
                    key={el.value}
                    onClick={handleProfileTab}
                  >
                    {el.name}
                  </div>
                ))}
              </div>
            </div>
            {!tabMenu && (
              <div className="info_container">
                <div className="left_container">
                  <Summary />
                  <MediaList />
                  <Friend />
                </div>
                <div className="right_container">
                  <ProfilePostList />
                </div>
              </div>
            )}
            {tabMenu === ""}
          </div>
        )}
        <Chatroom />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
