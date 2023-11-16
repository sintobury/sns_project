import { useForm } from "react-hook-form";
import "./CommentInput.css";
import { authInstance } from "../../../interceptors/interceptors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import Button from "../../Common/Button/Button";

interface childProps {
  boardId: number;
}

interface commentForm {
  content: string;
}

interface comment {
  commentId?: number;
  boardId: number;
  content: string;
  createAt?: string;
  state: string;
}

const CommentInput = ({ boardId }: childProps) => {
  const isdarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<commentForm>();
  const queryClient = useQueryClient();
  const postingComment = async (comment: comment) => {
    await authInstance.post(`/comment`, comment);
  };
  const commentMutation = useMutation(postingComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comment", boardId]);
    },
  });

  const submitComment = async (formdata: commentForm) => {
    const comment = {
      boardId: boardId,
      content: formdata.content,
      // createAt: new Date().toLocaleString(),
      state: "NORMAL",
    };
    commentMutation.mutate(comment);
  };
  return (
    <form onSubmit={handleSubmit(submitComment)} className="comment_form">
      <input
        type="text"
        placeholder="내용을 입력해주세요"
        className="input"
        id="input_content"
        {...register("content", {
          required: "내용을 입력해주세요.",
        })}
      />
      {errors.content && <div className="errormessage">{errors.content.message}</div>}
      <div className={`input_button_container ${isdarkmode && "darkmode"}`}>
        <Button text="등록" type="submit" design="black" disabled={isSubmitting} />
      </div>
    </form>
  );
};

export default CommentInput;
