import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../redux/reducers/loginSlice";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { RootState } from "../../redux/reducers/rootReducer";
import { defaultInstance } from "../../interceptors/interceptors";
import { useEffect } from "react";
import Button from "../../components/Common/Button/Button";
import GoogleLoginButton from "../../components/GoogleLoginButton/GoogleLoginButton";

interface loginForm {
  username: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const isLogin = useSelector((state: RootState) => state.loginSlice.isLogin);
  // const connectLoginSocket = () => {
  //   useWebsocket();
  // const socket = new WebSocket(`${process.env.REACT_APP_WEB_SOCKET_URL}/ws/chat`);
  // const stompClient = webstomp.over(socket);
  // const headers = stompClient.connect(headers, () => {
  //   stompClient.subscribe(`${process.env.REACT_APP_WEB_SOCKET_URL}/user/topic/data`, () => {
  //     console.log("websocket connected");
  //   });
  // });
  // };

  const handleLogin = async (data: loginForm) => {
    try {
      const res = await defaultInstance.post("/login", data);
      if (res.data.statusCode === 200) {
        const username = data.username;
        // 로그인 시에 고유 id를 받아 저장
        const id = res.data.result.userTableId;
        console.log(res.data.result);
        const accessToken = res.data.result.accessToken;
        const refreshToken = res.data.result.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        alert(res.data.message);
        dispatch(login({ username, id }));
        navigate("/main");
      } else if (res.data.statusCode === 400) {
        alert(res.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert("회원가입이 필요합니다.");
        }
      }
    }
  };
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<loginForm>();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      dispatch(logout());
    }
  }, [isLogin]);
  return (
    <div className={`background_login ${isDarkmode && "darkmode"}`}>
      <div className="login_container">
        <p className={`logo ${isDarkmode && "darkmode"}`}>SNS_Project</p>
        <div className="login_body_container">
          <div className={`login_explain_container ${isDarkmode && "darkmode"}`}>web설명</div>
          <form
            className={`login_function_container ${isDarkmode && "darkmode"}`}
            onSubmit={handleSubmit(handleLogin)}
          >
            <div className="login_input_container">
              <label htmlFor="input_username">아이디</label>
              <input
                type="text"
                placeholder="아이디를 입력해주세요"
                className="input"
                id="input_username"
                {...register("username", {
                  required: "아이디를 입력해주세요.",
                })}
              ></input>
              {errors.username && <div className="errormessage">{errors.username?.message}</div>}
              <label htmlFor="input_password">비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                className="input"
                id="input_password"
                autoComplete="off"
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                })}
              ></input>
              {errors.password && <div className="errormessage">{errors.password?.message}</div>}
            </div>
            <div className="login_button_container">
              <Button type="submit" disabled={isSubmitting} text="로그인" design="black" />
              <GoogleLoginButton />
              <Button
                type="button"
                design="green"
                text="회원가입"
                onClick={() => navigate("/signup")}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
