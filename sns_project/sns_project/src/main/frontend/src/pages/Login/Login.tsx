import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/reducers/loginSlice";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLoginButton from "../../components/GoogleLoginButton/GoogleLoginButton";
import { useForm } from "react-hook-form";
import { RootState } from "../../redux/reducers/rootReducer";
import { defaultInstance } from "../../interceptors/interceptors";
import { useEffect } from "react";

interface loginForm {
  username: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state: RootState) => state.loginSlice.isLogin);
  const handleLogin = async (data: loginForm) => {
    try {
      const res = await defaultInstance.post("/login", data);
      console.log("메시지: " + res.data.message);
      console.log("result" + res.data.result);
      if (res.status === 200) {
        const username = data.username;
        const accessToken = res.data.result.accessToken;
        const refreshToken = res.data.result.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(login({ username }));
        alert("로그인 되었습니다.");
        navigate("/main");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert("회원가입이 필요합니다.");
          // setError("formError", {
          //   message: "등록된 회원이 아닙니다.",
          // });
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
    if (isLogin) {
      navigate("/main");
    }
  });
  return (
    <div className="background_login">
      <div className="login_container">
        <p className="logo">SNS_Project</p>
        <div className="login_body_container">
          <div className="login_explain_container">web설명</div>
          <form className="login_function_container" onSubmit={handleSubmit(handleLogin)}>
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
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                })}
              ></input>
              {errors.password && <div className="errormessage">{errors.password?.message}</div>}
            </div>
            <div className="login_button_container">
              <button type="submit" id="login_button" disabled={isSubmitting}>
                로그인
              </button>
              <GoogleLoginButton />
              <button type="button" id="signup_button" onClick={() => navigate("/signup")}>
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
