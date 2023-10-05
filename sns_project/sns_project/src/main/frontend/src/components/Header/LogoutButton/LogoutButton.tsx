import { googleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/reducers/loginSlice";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    const googlelogin = true; //구글로그인일 때 판별필요
    if (googlelogin) {
      //구글 로그인 일때
      googleLogout();
    }
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <button className="menu" onClick={handleLogout}>
        로그아웃
      </button>
    </>
  );
};

export default LogoutButton;
