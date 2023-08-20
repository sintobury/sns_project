import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleModal } from '../../redux/reducers/openModal';
import { login } from '../../redux/reducers/loginSlice';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Signup from '../../components/Signup/Signup';
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openSignupModal = useSelector((state) => state.modalSlice.open);
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
  const handleLogin = () => {
    axios
      .post('url/login', inputVal)
      .then((res) => {
        console.log('메시지: ' + res.data.message);
        const username = res.data.username;
        const accessToken = res.headers.get('Authorization');
        const refreshToken = res.headers.get('Refresh');
        dispatch(login({ username, accessToken, refreshToken }));
        alert('로그인 되었습니다.');
        navigate('/main');
      })
      .catch((error) => {
        console.error('Error : ', error.response.status);
        if (error.response.status === 401) {
          alert('회원가입이 필요합니다.');
        }
      });
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
              <button id="login_button" onClick={handleLogin}>
                로그인
              </button>
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
