import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../redux/reducers/loginSlice";
import { authInstance } from "../../interceptors/interceptors";
import { useEffect } from "react";

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

const Oauth = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const error = Number(searchParams.get("error")) as number;
  const accessToken = searchParams.get("accessToken") as string;
  const refreshToken = searchParams.get("refreshToken") as string;
  const getUserInfo = async () => {
    const res = await authInstance.get(`/member/info`);
    const response: ResponseDTO = res.data;
    dispatch(login({ username: response.result.username, id: response.result.id }));
    navigate("/main");
  };
  useEffect(() => {
    if (error === 405) {
      alert("중복 로그인은 불가능합니다.");
      navigate("/");
    }
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      getUserInfo();
    }
  }, []);

  return <></>;
};
export default Oauth;
