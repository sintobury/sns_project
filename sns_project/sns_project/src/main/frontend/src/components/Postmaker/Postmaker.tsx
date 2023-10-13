import { useForm } from "react-hook-form";
import "./Postmaker.css";
import { authInstance } from "../../interceptors/interceptors";
import Button from "../Common/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

interface PostInput {
  title: string;
  content: string;
}

const Postmaker = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<PostInput>();

  const makePost = (postInfo: PostInput) => {
    const res = authInstance.post("/post", postInfo);
    console.log(res);
  };

  return (
    <div className="postmaker_container">
      <div className={`postmaker_propile_container ${isDarkmode && "darkmode"}`}>
        <img src="" alt="profileimg"></img>
      </div>
      <form
        className={`postmaker_input_container ${isDarkmode && "darkmode"}`}
        onSubmit={handleSubmit(makePost)}
      >
        <input
          className={`title_input ${isDarkmode && "darkmode"}`}
          placeholder="제목을 입력하세요"
          id="title_input"
          {...register("title", {
            required: "제목을 입력해주세요.",
          })}
        ></input>
        {errors.title && <div className="errormessage">{errors.title?.message}</div>}
        <textarea
          className={`content_input  ${isDarkmode && "darkmode"}`}
          placeholder="내용을 입력하세요"
          id="content_input"
          {...register("content", {
            required: "내용을 입력해주세요.",
          })}
        ></textarea>
        {errors.content && <div className="errormessage">{errors.content?.message}</div>}
      </form>
      <div className={`postmaker_button_container ${isDarkmode && "darkmode"}`}>
        <Button text="작성하기" type="submit" disabled={isSubmitting} design="black" />
        <Button text="미디어 추가" type="button" design="black" />
        <Button text="파일 추가" type="button" design="black" />
        <Button text="태그 추가" type="button" design="black" />
      </div>
    </div>
  );
};
export default Postmaker;
