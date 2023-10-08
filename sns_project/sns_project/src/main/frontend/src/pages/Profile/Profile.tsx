import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { authInstance } from "../../interceptors/interceptors";
import "./Profile.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");
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
  const { isLoading, data: profileData } = useQuery<ResponseDTO>(
    ["profileData", { location }],
    getUserInfo,
    {
      staleTime: Infinity,
    },
  );
  console.log(profileData);
  return (
    <div className="profile_page">
      <Header />
      <div className="main_content_container">
        <Sidebar />
        {isLoading ? null : (
          <div className="profile_container">
            <div className="profile_summary_container">
              <div className="profile_img_container">
                <img className="profile_img" id="user_profile_img" alt="profile img"></img>
                <label htmlFor="user_profile_img">사용자 이름</label>
              </div>
              <div className="profile_tab_container">
                <div className="tab_menu">프로필</div>
                <div className="tab_menu">정보</div>
                <div className="tab_menu">친구</div>
                <div className="tab_menu">동영상 및 사진</div>
              </div>
            </div>
            <div className="info_container">
              <div className="left_container">
                <div>본인소개 요약 컴포넌트로 대체</div>
                <div>사진 및 동영상 컴포넌트로 대체</div>
                <div>친구 컴포넌트로 대체</div>
              </div>
              <div className="right_container">
                <div>게시글 컴포넌트로 대체</div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
