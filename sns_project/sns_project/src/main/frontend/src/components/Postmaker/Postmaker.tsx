import { useForm } from "react-hook-form";
import "./Postmaker.css";
import { authInstance } from "../../interceptors/interceptors";

interface PostInput {
  title: string;
  content: string;
}

const Postmaker = () => {
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
      <div className="postmaker_propile_container">
        <img src="" alt="propile"></img>
      </div>
      <form className="postmaker_input_container" onSubmit={handleSubmit(makePost)}>
        <input
          className="title_input"
          placeholder="제목을 입력하세요"
          id="title_input"
          {...register("title", {
            required: "제목을 입력해주세요.",
          })}
        ></input>
        {errors.title && <div className="errormessage">{errors.title?.message}</div>}
        <textarea
          className="content_input"
          placeholder="내용을 입력하세요"
          id="content_input"
          {...register("content", {
            required: "내용을 입력해주세요.",
          })}
        ></textarea>
        {errors.content && <div className="errormessage">{errors.content?.message}</div>}
      </form>
      <div className="postmaker_button_container">
        <div className="post_button_container">
          <button className="post_button" type="submit" disabled={isSubmitting}>
            작성 하기
          </button>
        </div>
        <div className="content_option_button_container">
          <button className="content_option_button">미디어 추가</button>
          <button className="content_option_button">파일 추가</button>
          <button className="content_option_button">태그 추가</button>
        </div>
      </div>
    </div>
  );
};
export default Postmaker;
