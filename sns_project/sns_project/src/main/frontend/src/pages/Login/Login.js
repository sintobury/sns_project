import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleModal } from '../../redux/reducers/openModal';
import './Login.css';
import Signup from '../../components/Signup/Signup';

const Login = () => {
  const dispatch = useDispatch();
  const openSignupModal = useSelector((state) => state.openmodal.open);
  const [inputVal, setInputVal] = useState({
    email: '',
    password: '',
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputVal({ ...inputVal, [name]: value });
  };
  const handleSignupModal = () => {
    dispatch(handleModal(!openSignupModal));
  };

  return (
    <div className="background">
      <div className="login_container">
        <div className="logoimg">
          <img id="logo" alt="logo"></img>
          <label htmlFor="logo">
            <h1>SNS_Project</h1>
          </label>
        </div>
        <div className="login_body_container">
          <div className="login_explain_container">web설명</div>
          <div className="login_function_container">
            <div className="login_input_container">
              <label htmlFor="input_email">이메일</label>
              <input
                type="text"
                placeholder="email을 입력해주세요"
                name="email"
                value={inputVal.email}
                onChange={handleInput}
                className="input"
                id="input_email"
              ></input>
              <label htmlFor="input_password">비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                name="password"
                value={inputVal.password}
                onChange={handleInput}
                className="input"
                id="input_password"
              ></input>
            </div>
            <div className="login_button_container">
              <button id="login_button">로그인</button>
              <button id="social_login_button">구글 로그인</button>
              <button id="signup_button" onClick={handleSignupModal}>
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
      {openSignupModal ? <Signup /> : null}
    </div>
  );
};

export default Login;
