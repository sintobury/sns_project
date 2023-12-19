import { useSelector } from "react-redux";
import "./Summary.css";
import { RootState } from "../../../redux";

interface childProps {
  userinfo: MemberDTO;
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
}

const Summary = ({ userinfo }: childProps) => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  return (
    <div className={`summary_container ${isDarkmode && "darkmode"}`}>
      <p className="component_title">프로필</p>
      <div className="profile_user_info_container">
        <p className="info_title">이름</p>
        <p className="profile_user_info">{userinfo.name}</p>
      </div>
      <div className="profile_user_info_container">
        <p className="info_title">가입일</p>
        <p className="profile_user_info">{userinfo.createAt.substring(0, 10)}</p>
      </div>
      <div className="profile_user_info_container">
        <p className="info_title">생일</p>
        <p className="profile_user_info">
          {userinfo.birth === null ? "미등록" : userinfo.birth.substring(0, 10)}
        </p>
      </div>
      <div className="profile_user_info_container">
        <p className="info_title">이메일</p>
        <p className="profile_user_info">{userinfo.email}</p>
      </div>
    </div>
  );
};

export default Summary;
