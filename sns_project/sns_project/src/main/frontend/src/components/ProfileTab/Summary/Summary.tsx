import { useDispatch, useSelector } from "react-redux";
import "./Summary.css";
import { RootState } from "../../../redux";
import Button from "../../Common/Button/Button";
import { handleModal } from "../../../redux/reducers/openModal";
import ProfileUpdateForm from "./ProfileUpdate/ProfileUpdate";

interface childProps {
  userinfo: MemberDTO;
  username: string | null;
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

const Summary = ({ userinfo, username }: childProps) => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const modalOpen = useSelector((state: RootState) => state.modalSlice.open);
  const loginUsername = useSelector((state: RootState) => state.loginSlice.username);
  const dispatch = useDispatch();
  const openUpdateForm = () => {
    dispatch(handleModal(true));
  };
  return (
    <div className={`summary_container ${isDarkmode && "darkmode"}`}>
      <div className="profile_summary_title">
        <p className="component_title">프로필</p>
        {loginUsername === username && (
          <Button text="수정" type="button" onClick={openUpdateForm} />
        )}
      </div>
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
      {modalOpen && <ProfileUpdateForm userinfo={userinfo} username={username} />}
    </div>
  );
};

export default Summary;
