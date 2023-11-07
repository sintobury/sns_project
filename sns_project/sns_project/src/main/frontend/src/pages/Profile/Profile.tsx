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
import { ChangeEvent, FormEvent, useState } from "react";
import Loading from "../../components/Common/Loading/Loading";
import ProfileFriend from "../../components/ProfileFriend/ProfileFriend";

interface ResponseDTO {
  statusCode: string;
  message: string;
  result: MemberDTO;
}

interface MemberDTO {
  id: number;
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
  const [fileImg, setFileImg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");
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

  const displayUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      const file = target.files[0];
      setFileImg(URL.createObjectURL(file));
    }
  };
  const getuserProfileImg = async () => {
    try {
      const res = await authInstance.get(`/member/profile`);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  const userProfileImg = useQuery(["profile_img", loginusername], getuserProfileImg, {
    staleTime: Infinity,
  });
  console.log(userProfileImg.data);
  const getUserInfo = async () => {
    try {
      if (username !== loginusername) {
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
      navigate(`/profile?username=${username}`);
    } else {
      navigate(`/profile?username=${username}&tabmenu=${menu}`);
    }
  };

  const { isLoading, data: profileData } = useQuery<ResponseDTO>(
    ["profileData", username],
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
        {isLoading ? (
          <Loading />
        ) : (
          profileData && (
            <div className="profile_container">
              <div className={`profile_summary_container ${isDarkmode && "darkmode"}`}>
                <div className={`profile_img_container ${isDarkmode && "darkmode"}`}>
                  <img
                    className="profile_img"
                    id="user_profile_img"
                    alt="user_img"
                    src={userProfileImg.data?.result}
                  ></img>
                  <label htmlFor="user_profile_img" className={`label ${isDarkmode && "darkmode"}`}>
                    {profileData?.result.name}
                  </label>
                </div>
                {username === loginusername && (
                  <form
                    onSubmit={(e) => submitImg(e)}
                    encType="multipart/form-data"
                    className="profile_img_form"
                  >
                    <div className="file_upload_container">
                      {fileImg !== "" && (
                        <img src={fileImg} alt="file_img" className="uploadfile" />
                      )}
                      <input
                        id="profile_img"
                        type="file"
                        accept="image/*"
                        name="profile_img"
                        onChange={displayUploadFile}
                      />
                    </div>
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
                    <Friend userId={profileData?.result.id} username={username} />
                  </div>
                  <div className="right_container">
                    <ProfilePostList username={username} />
                  </div>
                </div>
              )}
              {tabMenu === "friend" && <ProfileFriend userId={profileData.result.id} />}
            </div>
          )
        )}
        <Chatroom />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
