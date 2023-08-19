import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { handleModal } from '../../redux/reducers/openModal';
import './Signup.css';
import axios from 'axios';

const Signup = () => {
  const signupdata = [
    { name: 'username', placeholder: '성함' },
    { name: 'email', placeholder: '이메일' },
    { name: 'newPassword', placeholder: '새 비밀번호' },
    { name: 'confirmPassword', placeholder: '비밀번호 확인' },
  ];
  const [inputVal, setInputVal] = useState({
    username: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
    birth: '',
    gender: '',
  });
  const [isValid, setisValid] = useState(false);
  const dispatch = useDispatch();
  const openSignupModal = useSelector((state) => state.modalSlice.open);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputVal({ ...inputVal, [name]: value });
  };
  let isSet, isSame, isEmailSet, isValidEmail;
  let regex = new RegExp('^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');
  if (inputVal.email) {
    isEmailSet = true;
    isValidEmail = false;
  }
  if (regex.test(inputVal.email)) {
    isValidEmail = true;
  }
  if (inputVal.newPassword && inputVal.confirmPassword) {
    isSet = true;
    isSame = false;
  }
  if (inputVal.confirmPassword === inputVal.newPassword) {
    isSame = true;
  }
  const handleSignup = () => {
    if (isEmailSet && !isValidEmail) {
      alert('유효하지 않은 이메일 형식입니다.');
    } else if (isValid) {
      axios
        .post('url', inputVal)
        .then((res) => {
          console.log(res.data.message);
          alert('회원가입 되었습니다.');
          dispatch(handleModal(!openSignupModal));
        })
        .catch((error) => {
          console.error('Error : ', error.response.status);
        });
    } else if (!isValid) {
      alert('정보를 모두 입력해주세요.');
    }
  };
  useEffect(() => {
    for (let key in inputVal) {
      if (inputVal[key] === '') {
        setisValid(false);
        return;
      }
    }
    setisValid(true);
  }, [inputVal]);
  return (
    <div
      className="modal_background"
      role="button"
      onClick={() => dispatch(handleModal(!openSignupModal))}
      onKeyUp={() => {}}
      tabIndex={0}
    >
      <div
        className="signup_modal_container"
        role="button"
        onClick={(e) => e.stopPropagation()}
        onKeyUp={() => {}}
        tabIndex={0}
      >
        <div className="modal_title">
          <h3>회원가입</h3>
          <button
            className="exit"
            onClick={() => dispatch(handleModal(!openSignupModal))}
          >
            X
          </button>
        </div>
        <div className="signup_body_container">
          <div className="signup_input_label">
            {signupdata.map((el) => (
              <label
                key={el.name}
                htmlFor={el.name}
                className="signupdata_label"
              >
                {el.placeholder}
              </label>
            ))}
            <label htmlFor="birth" className="signupdata_label">
              생년월일
            </label>
            <label htmlFor="gender" className="signupdata_label">
              성별
            </label>
          </div>
          <div className="signup_input_container">
            {signupdata.map((el) => (
              <input
                key={el.name}
                name={el.name}
                type={el.name.includes('Password') ? 'password' : 'text'}
                className="signup_input"
                placeholder={el.placeholder}
                id={el.name}
                onChange={handleInput}
              ></input>
            ))}
            {isSet && !isSame ? (
              <div className="alert">새 비밀번호와 다릅니다</div>
            ) : null}
            <input
              type="date"
              id="birth"
              name="birth"
              onChange={handleInput}
            ></input>
            <div id="gender">
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  id="male"
                  onChange={handleInput}
                ></input>
                <label htmlFor="male">남성</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="famale"
                  id="female"
                  onChange={handleInput}
                ></input>
                <label htmlFor="female">여성</label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button className="signup_button" onClick={handleSignup}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
