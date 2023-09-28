import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Profile.css";

const Profile = () => {
  return (
    <>
      <Header />
      <div className="main_content_container">
        <Sidebar />
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
      </div>
      <Footer />
    </>
  );
};

export default Profile;
