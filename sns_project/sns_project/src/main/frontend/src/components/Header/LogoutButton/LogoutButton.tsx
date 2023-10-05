import { googleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/reducers/loginSlice";
import { authInstance } from "../../../interceptors/interceptors";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const googlelogin = false; //구글로그인일 때 판별필요
    if (googlelogin) {
      //구글 로그인 일때
      googleLogout();
      dispatch(logout());
      navigate("/");
      return;
    }
    const refreshToken = localStorage.getItem("refreshToken");
    const res = await authInstance.post("/logout", { refreshToken });
    if (res.status === 200) {
      dispatch(logout());
      navigate("/");
    }
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
