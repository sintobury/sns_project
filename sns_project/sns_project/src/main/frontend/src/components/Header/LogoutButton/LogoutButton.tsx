// import { googleLogout } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/reducers/loginSlice";
import { defaultInstance } from "../../../interceptors/interceptors";
import { RootState } from "../../../redux";
import { useWebsocket } from "../../../hook/useWebsocket";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const { disconnect } = useWebsocket();
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const res = await defaultInstance.post("/logout", { refreshToken });
    if (res.data.statusCode === 200) {
      dispatch(logout());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      disconnect();
      navigate("/");
    }
  };
  return (
    <>
      <div className={`menu ${isDarkmode && "darkmode"}`} onClick={handleLogout}>
        로그아웃
      </div>
    </>
  );
};

export default LogoutButton;
