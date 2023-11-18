import { useForm } from "react-hook-form";
import "./ProfileUpdate.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authInstance } from "../../../../interceptors/interceptors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import Button from "../../../Common/Button/Button";
import { handleModal } from "../../../../redux/reducers/openModal";

interface childProps {
  userinfo: MemberDTO;
  username: string | null;
}
interface MemberDTO {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  birth: string;
  createAt: string;
  provider: string;
  profile: FileDTO;
}

interface FileDTO {
  id: number;
  path: string;
  name: string;
  type: string;
  size: number;
}

interface updateForm {
  name: string;
  birth: string;
  new_password: string;
  check_password: string;
  original_password: string;
}

const ProfileUpdateForm = ({ userinfo, username }: childProps) => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<updateForm>({
    defaultValues: {
      name: userinfo.name,
      new_password: "",
      check_password: "",
      birth: userinfo.birth === null ? "" : userinfo.birth.substring(0, 10),
    },
  });

  const updateProfile = async (formData: updateForm) => {
    const newProfile = userinfo;
    newProfile.name = formData.name;
    newProfile.password = formData.new_password;
    newProfile.birth = `${formData.birth} 00:00:00`;
    await authInstance.post(`/member/update`, newProfile);
  };

  const profileMutation = useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.refetchQueries(["profileData", username]);
    },
  });

  const submitNewProfile = (formData: updateForm) => {
    profileMutation.mutate(formData);
  };

  const closeModal = () => {
    dispatch(handleModal(false));
  };
  return (
    <form
      onSubmit={handleSubmit(submitNewProfile)}
      className={`profile_update_modal_form ${isDarkmode && "darkmode"}`}
    >
      <div className="component_title_container">
        <p className="component_title">프로필 수정</p>
        <Button text="X" type="button" onClick={closeModal} />
      </div>
      {/* <div>
        <input
          id="original_password"
          className={`input ${isDarkmode && "darkmode"}`}
          {...register("original_password", {
            required: "기존 비밀번호를 입력해주세요.",
          })}
          placeholder="비밀번호를 입력해주세요."
          type="password"
        />
      </div>
      {errors.original_password && (
        <p className="error_message">{errors.original_password.message}</p>
      )} */}
      <label htmlFor="name">이름</label>
      <input
        id="name"
        className={`${errors.name ? "errorInput" : "input"} ${isDarkmode && "darkmode"}`}
        {...register("name", {
          required: "이름을 입력해주세요.",
        })}
        placeholder="이름을 입력해주세요."
        type="text"
      />
      {errors.name && <p className="error_message">{errors.name.message}</p>}
      <label htmlFor="birth">생일</label>
      <input
        id="birth"
        className={`${errors.birth ? "errorInput" : "input"} ${isDarkmode && "darkmode"}`}
        {...register("birth", {
          required: "생일을 입력해주세요.",
          pattern: {
            value: /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
            message: "생일은 yyyy-mm-dd 형식으로 입력해주세요.",
          },
        })}
        placeholder="생일을 yyyy-mm-dd 형식으로 입력해주세요."
        type="text"
      />
      {errors.birth && <p className="error_message">{errors.birth.message}</p>}
      <label htmlFor="new_password">새 비밀번호</label>
      <input
        id="new_password"
        className={`${errors.new_password ? "errorInput" : "input"} ${isDarkmode && "darkmode"}`}
        {...register("new_password", {
          required: "새 비밀번호를 입력해주세요.",
          minLength: {
            value: 8,
            message: "8자리 이상의 비밀번호를 사용해주세요.",
          },
          pattern: {
            value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9])/,
            message: "비밀번호는 숫자, 특수문자, 영문을 조합해주세요.",
          },
        })}
        placeholder="새 비밀번호를 입력해주세요."
        type="password"
      />
      {errors.new_password && <p className="error_message">{errors.new_password.message}</p>}
      <label htmlFor="check_password">새 비밀번호 확인</label>
      <input
        id="check_password"
        className={`${errors.check_password ? "errorInput" : "input"} ${isDarkmode && "darkmode"}`}
        {...register("check_password", {
          required: "새로운 비밀번호와 같게 입력해주세요.",
        })}
        placeholder="같은 비밀번호를 입력해주세요."
        type="password"
      />
      {errors.check_password && <p className="error_message">{errors.check_password.message}</p>}
      <Button text="수정" type="submit" design="black" disabled={isSubmitting} />
    </form>
  );
};

export default ProfileUpdateForm;
