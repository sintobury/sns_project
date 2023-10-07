// import { googleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/reducers/loginSlice";
import { defaultInstance } from "../../../interceptors/interceptors";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    // const googlelogin = false; //구글로그인일 때 판별필요
    // if (googlelogin) {
    //   //구글 로그인 일때
    //   googleLogout();
    //   dispatch(logout());
    //   navigate("/");
    //   return;
    // }
    const refreshToken = localStorage.getItem("refreshToken");
    const res = await defaultInstance.post("/logout", { refreshToken });
    if (res.status === 200) {
      dispatch(logout());
      navigate("/");
    }
  };
  return (
    <>
      <div className="menu" onClick={handleLogout}>
        로그아웃
      </div>
    </>
  );
};

export default LogoutButton;
