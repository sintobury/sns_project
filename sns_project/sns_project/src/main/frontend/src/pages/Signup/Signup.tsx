import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Signup.css";
import { useForm } from "react-hook-form";
import { defaultInstance } from "../../interceptors/interceptors";
import Button from "../../components/Common/Button/Button";
interface signupField {
  name: string;
  username: string;
  email: string;
  password: string;
  checkpassword: string;
  birth: string;
  gender: string;
}

const Signup = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    getValues,
  } = useForm<signupField>();

  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const handleSignup = async (data: signupField) => {
    const body = {
      username: data.username,
      password: data.password,
      name: data.name,
      gender: data.gender,
      email: data.email,
      birth: `${data.birth} 00:00:00`,
    };
    try {
      const res = await defaultInstance.post("/join", body);
      if (res.status === 200) {
        alert("회원가입 되었습니다.");
        navigate("/");
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      // setError("formError", { message: "양식에 맞춰 작성해주세요." });
    }
  };

  const validateID = async (data: string) => {
    try {
      const res = await defaultInstance.get(`/check/username?username=${data}`);
      if (res.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      // setError("formError", { message: "중복된 아이디입니다." });
    }
  };

  return (
    <div className="background_signup">
      <div className="signup_container">
        <p className="form_title">회원가입</p>
        <form onSubmit={handleSubmit(handleSignup)} className="signup_form">
          <label htmlFor="name" className="form_label">
            성함
          </label>
          <input
            id="name"
            type="text"
            placeholder="성함"
            className={errors.name ? "errorInput" : "input"}
            {...register("name", {
              required: "성함을 작성해주세요.",
            })}
          />
          {errors.name && <div className="errormessage">{errors.name?.message}</div>}
          <label htmlFor="username" className="form_label">
            아이디
          </label>
          <div className="username_input">
            <input
              id="username"
              type="text"
              placeholder="아이디"
              className={errors.username ? "errorInput" : "input"}
              {...register("username", {
                required: "아이디를 작성해주세요.",
              })}
            />
            <Button
              type="button"
              onClick={() => validateID(getValues("username"))}
              text="중복확인"
              design="black"
            ></Button>
          </div>
          {errors.username && <div className="errormessage">{errors.username?.message}</div>}
          {success && <div className="successmessage">사용가능한 아이디입니다.</div>}
          <label htmlFor="email" className="form_label">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className={errors.email ? "errorInput" : "input"}
            {...register("email", {
              required: "이메일을 작성해주세요.",
              pattern: {
                value:
                  //eslint-disable-next-line
                  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                message: "이메일 형식에 맞게 작성해주세요.",
              },
            })}
          />
          {errors.email && <div className="errormessage">{errors.email?.message}</div>}
          <label htmlFor="password" className="form_label">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호는 8자리 이상의 숫자, 특수문자, 영문을 조합해주세요."
            className={errors.password ? "errorInput" : "input"}
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              minLength: {
                value: 8,
                message: "8자리 이상의 비밀번호를 사용해주세요.",
              },
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9])/,
                message: "비밀번호는 숫자, 특수문자, 영문을 조합해주세요.",
              },
            })}
          />
          {errors.password && <div className="errormessage">{errors.password?.message}</div>}
          <label htmlFor="chekcpassword">비밀번호 확인</label>
          <input
            id="checkpassword"
            type="password"
            placeholder="비밀번호 확인"
            className={errors.checkpassword ? "errorInput" : "input"}
            {...register("checkpassword", {
              required: "비밀번호를 확인해주세요.",
              validate: (value) => {
                if (value !== getValues("password")) {
                  return "비밀번호가 일치하지 않습니다.";
                }
              },
            })}
          />
          {errors.checkpassword && (
            <div className="errormessage">{errors.checkpassword?.message}</div>
          )}
          <label htmlFor="birth" className="form_label">
            생년월일
          </label>
          <input
            id="birth"
            type="date"
            className={errors.birth ? "errorInput" : "input"}
            {...register("birth", {
              required: "생년월일을 지정해주세요.",
            })}
          />
          {errors.checkpassword && <div className="errormessage">{errors.birth?.message}</div>}
          <label htmlFor="gender" className="form_label">
            성별
          </label>
          <div id="gender">
            <label htmlFor="male">남성</label>
            <input
              id="male"
              type="radio"
              value="MALE"
              className={errors.gender ? "errorInput" : "input"}
              {...register("gender", {
                required: "성별을 선택해주세요.",
              })}
            />
            <label htmlFor="female">여성</label>
            <input
              id="female"
              type="radio"
              value="FEMALE"
              className={errors.gender ? "errorInput" : "input"}
              {...register("gender", {
                required: "성별을 선택해주세요.",
              })}
            />
          </div>
          {errors.checkpassword && <div className="errormessage">{errors.gender?.message}</div>}
          <div className="signup_button_container">
            <Button type="button" text="취소" design="green" onClick={() => navigate(-1)} />
            <Button type="submit" disabled={isSubmitting} text="회원가입" design="black" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
