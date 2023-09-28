import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const googlelogin = true; //구글로그인일 때 판별필요
    if (googlelogin) {
      //구글 로그인 일때
      googleLogout();
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
