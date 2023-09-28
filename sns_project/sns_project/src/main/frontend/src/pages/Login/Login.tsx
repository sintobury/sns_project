import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/reducers/loginSlice";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLoginButton from "../../components/GoogleLoginButton/GoogleLoginButton";
import { useForm } from "react-hook-form";

interface loginForm {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.loginSlice.isLogin);
  if (isLogin) {
    navigate("/main");
  }
  const handleLogin = async (data: loginForm) => {
    try {
      const res = await axios.post("url/login", data);
      console.log("메시지: " + res.data.message);
      if (res.status === 200) {
        const headers = res.headers;
        const username = res.data.username;
        const accessToken = headers["Authorization"];
        const refreshToken = headers["Refresh"];
        dispatch(login({ username, accessToken, refreshToken }));
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

  return (
    <div className="background_login">
      <div className="login_container">
        <p className="logo">SNS_Project</p>
        <div className="login_body_container">
          <div className="login_explain_container">web설명</div>
          <form className="login_function_container" onSubmit={handleSubmit(handleLogin)}>
            <div className="login_input_container">
              <label htmlFor="input_email">이메일</label>
              <input
                type="email"
                placeholder="email을 입력해주세요"
                className="input"
                id="input_email"
                {...register("email", {
                  required: "email을 입력해주세요.",
                })}
              ></input>
              {errors.email && <div className="errormessage">{errors.email?.message}</div>}
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
