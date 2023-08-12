import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { handleModal } from '../../redux/reducers/openModal';
import './Signup.css';

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
    sex: '',
  });
  const dispatch = useDispatch();
  const openSignupModal = useSelector((state) => state.openmodal.open);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputVal({ ...inputVal, [name]: value });
    console.log(inputVal);
  };
  let isSet, isSame;
  if (inputVal.newPassword && inputVal.confirmPassword) {
    isSet = true;
    isSame = false;
  }
  if (inputVal.confirmPassword === inputVal.newPassword) {
    isSame = true;
  }
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
            <label htmlFor="sex" className="signupdata_label">
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
            <div id="sex">
              <div>
                <input
                  type="radio"
                  name="sex"
                  value="male"
                  id="male"
                  onChange={handleInput}
                ></input>
                <label htmlFor="male">남성</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="sex"
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
          <button className="signup_button">회원가입</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
