import { useForm } from "react-hook-form";
import "./Postmaker.css";
import { authInstance } from "../../interceptors/interceptors";
import Button from "../Common/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { useEffect, useState } from "react";

interface PostInput {
  title: string;
  content: string;
  media_files: FileList;
}

const Postmaker = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  // const [image, setImage] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    // getValues,
    watch,
  } = useForm<PostInput>();
  const fileImg = watch("media_files");

  const makePost = async (postInfo: PostInput) => {
    if (postInfo.media_files.length > 4) {
      alert("이미지나 동영상은 4개까지만 첨부 할 수 있습니다.");
      return;
    }
    const formdata = new FormData();
    formdata.append("title", postInfo.title);
    formdata.append("content", postInfo.content);
    formdata.append("createAt", new Date().toLocaleString());
    formdata.append("hashTag", "you");
    // const board = {
    //   title: postInfo.title,
    //   content: postInfo.content,
    //   createdAt: new Date().toLocaleString(),
    //   hashTag: "",
    // };
    // const params = new URLSearchParams();
    // params.append("title", postInfo.title);
    // params.append("content", postInfo.content);
    // params.append("createdAt", new Date().toLocaleString());
    // params.append("hashTag", "");
    const fileArray = Array.from(postInfo.media_files);
    console.log(fileArray);
    fileArray.forEach((el) => {
      formdata.append("files", el);
    });
    // console.log(files);

    const res = await authInstance.post(`/board`, formdata, {
      // params: params,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);
  };

  useEffect(() => {
    if (fileImg && fileImg.length > 4) {
      alert("이미지나 동영상은 4개까지만 첨부 할 수 있습니다.");
      return;
    }
    if (fileImg && fileImg.length > 0) {
      const convertedFiles = [];
      for (let i = 0; i < fileImg.length; i++) {
        const file = fileImg[i];
        convertedFiles.push(file);
      }
      setFiles(convertedFiles);
    }
  }, [fileImg]);

  return (
    <div className="postmaker_container">
      <div className={`postmaker_propile_container ${isDarkmode && "darkmode"}`}>
        <img src="" alt="profileimg"></img>
      </div>
      <form
        className={`postmaker_input_container ${isDarkmode && "darkmode"}`}
        onSubmit={handleSubmit(makePost)}
        encType="multipart/form-data"
      >
        <input
          className={`title_input ${isDarkmode && "darkmode"}`}
          placeholder="제목을 입력하세요"
          id="title_input"
          {...register("title", {
            required: "제목을 입력해주세요.",
          })}
        />
        {errors.title && <div className="errormessage">{errors.title?.message}</div>}
        <textarea
          className={`content_input  ${isDarkmode && "darkmode"}`}
          placeholder="내용을 입력하세요"
          id="content_input"
          {...register("content", {
            required: "내용을 입력해주세요.",
          })}
        />
        {errors.content && <div className="errormessage">{errors.content?.message}</div>}
        <div className="file_img_container">
          {files &&
            files.length > 0 &&
            files.map((el) => (
              <div key={el.name} className="file_img">
                <img src={URL.createObjectURL(el)} alt="file_img" className="uploadfile" />
                <p className="file_name">{el.name}</p>
              </div>
            ))}
        </div>
        <div className={`postmaker_button_container ${isDarkmode && "darkmode"}`}>
          <label htmlFor="media_files">
            <div className={`file_upload_button ${isDarkmode && "darkmode"}`}>파일 업로드</div>
          </label>
          <input
            className={`file_input ${isDarkmode && "darkmode"}`}
            id="media_files"
            multiple
            {...register("media_files")}
            type="file"
            accept="image/*, video/*"
            name="media_files"
          />
          <Button text="작성하기" type="submit" disabled={isSubmitting} design="black" />
        </div>
      </form>
    </div>
  );
};
export default Postmaker;
