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
import { toggleDarkmode } from "../../redux/reducers/darkmode";

interface loginForm {
  username: string;
  password: string;
}

const Login = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const isLogin = useSelector((state: RootState) => state.loginSlice.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const setDarkmode = () => {
    dispatch(toggleDarkmode());
  };

  return (
    <div className={`background_login ${isDarkmode && "darkmode"}`}>
      <div className="login_container">
        <div className="logo_container">
          <p className={`logo ${isDarkmode && "darkmode"}`}>SNS_Project</p>
          <div className={`darkmode_menu ${isDarkmode && "darkmode"}`} onClick={setDarkmode}>
            <p className={`menu_title ${isDarkmode && "darkmode"}`}>다크모드</p>
            <div className={`toggle_container ${isDarkmode && "darkmode"}`}>
              <div className={`toggle_circle ${isDarkmode && "darkmode"}`}></div>
            </div>
          </div>
        </div>
        <div className="login_body_container">
          <div className={`login_explain_container ${isDarkmode && "darkmode"}`}>
            <p className="web_explain">
              SNS의 기본적인 기능들이 탑재되어 있는 웹입니다.현재 나에게 일어난 일이나 쓰고싶은
              내용을 게시글로 등록하거나 친구와 채팅을 나눠보세요!
            </p>
          </div>
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
