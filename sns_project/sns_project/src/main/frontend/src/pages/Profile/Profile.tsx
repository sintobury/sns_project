import "./Profile.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { authInstance } from "../../interceptors/interceptors";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Summary from "../../components/ProfileTab/Summary/Summary";
// import MediaList from "../../components/ProfileTab/MediaList/MediaList";
import Friend from "../../components/ProfileTab/Friend/Friend";
import ProfilePostList from "../../components/ProfileTab/ProfilePostList/ProfilePostList";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import Chatroom from "../../components/Chat/Chatroom";
import Button from "../../components/Common/Button/Button";
import Loading from "../../components/Common/Loading/Loading";
import ProfileFriend from "../../components/ProfileFriend/ProfileFriend";
import { useS3 } from "../../hook/useS3";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

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
  createAt: string;
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

interface profileInput {
  profile_img: FileList;
}

const Profile = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const loginusername = useSelector((state: RootState) => state.loginSlice.username);
  const [previewImage, setPreviewImage] = useState("");
  const [hasImg, setHasImg] = useState(false);
  const { getUrl } = useS3();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");
  const tabmenulist = [
    { name: "프로필", value: "" },
    { name: "친구", value: "friend" },
    { name: "작성 글", value: "postList" },
  ];
  const tabMenu = searchParams.get("tabmenu");
  const queryClient = useQueryClient();
  const {
    register,
    resetField,
    formState: { isSubmitting },
    handleSubmit,
    watch,
  } = useForm<profileInput>();

  const previewImg = watch("profile_img");

  const submitImg = async (imgInput: profileInput) => {
    const file = imgInput.profile_img[0];
    const form = new FormData();
    form.append("file", file);
    if (hasImg) {
      await authInstance.delete(`/member/profile`);
    }
    const res = await authInstance.post(`/member/profile`, form);
    if (res.data.statusCode === 200) {
      queryClient.refetchQueries(["profileData", loginusername]);
      resetField("profile_img");
      setPreviewImage("");
    }
  };

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
      window.scrollTo(0, 0);
    } else {
      navigate(`/profile?username=${username}&tabmenu=${menu}`);
      window.scrollTo(0, 0);
    }
  };

  const { isLoading, data: profileData } = useQuery<ResponseDTO>(
    ["profileData", username],
    getUserInfo,
    {
      staleTime: Infinity,
      onSuccess: (data) => {
        if (data.result.profile !== null) {
          setHasImg(true);
          data.result.profile.path = getUrl(data.result.profile.path, data.result.profile.type);
          console.log(data.result);
        } else {
          data.result.profile = {
            id: 3,
            name: "file",
            path: "https://s3.ap-northeast-2.amazonaws.com/testsnsproject/42c40320-2fbd-4ca3-a8d3-6422c92b697b.jpg",
            size: 8690,
            type: "jpg",
          };
        }
      },
    },
  );
  useEffect(() => {
    if (previewImg && previewImg.length > 0) {
      setPreviewImage(URL.createObjectURL(previewImg[0]));
    }
  }, [previewImg]);
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
                    src={profileData?.result.profile.path}
                  ></img>
                  <label htmlFor="user_profile_img" className={`label ${isDarkmode && "darkmode"}`}>
                    {profileData?.result.name}
                  </label>
                </div>
                {username === loginusername && (
                  <form onSubmit={handleSubmit(submitImg)} className="profile_img_form">
                    <div className="file_upload_container">
                      {previewImage !== "" && (
                        <div className="file_img">
                          <img src={previewImage} alt="file_img" className="uploadfile" />
                          <p className="file_name">{previewImg[0].name}</p>
                        </div>
                      )}
                      <input
                        id="profile_img"
                        className={`file_input ${isDarkmode && "darkmode"}`}
                        {...register("profile_img")}
                        type="file"
                        accept="image/*"
                        name="profile_img"
                      />
                      <label htmlFor="profile_img">
                        <div className={`file_upload_button ${isDarkmode && "darkmode"}`}>
                          프로필 이미지 변경
                        </div>
                      </label>
                    </div>
                    <Button type="submit" text="저장" design="black" disabled={isSubmitting} />
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
                    <Summary userinfo={profileData.result} username={username} />
                    {/* <MediaList /> */}
                    <Friend userId={profileData?.result.id} username={username} />
                  </div>
                  <div className="right_container">
                    <ProfilePostList username={username} id={profileData.result.id} />
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
