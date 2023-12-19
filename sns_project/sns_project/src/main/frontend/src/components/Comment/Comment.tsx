import { useSelector } from "react-redux";
import "./Comment.css";
import { RootState } from "../../redux";
import { authInstance } from "../../interceptors/interceptors";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Common/Loading/Loading";
import CommentInput from "./CommentInput/CommentInput";

interface childProps {
  boardId: number;
}

interface commentResponse {
  message: string;
  statusCode: number;
  result: comment[];
}

interface comment {
  commentId?: number;
  boardId: number;
  content: string;
  createAt: string;
  state: string;
}

const Comment = ({ boardId }: childProps) => {
  const isdarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const getComment = async () => {
    const res = await authInstance.get(`/comment/${boardId}`, {
      data: {
        id: boardId,
      },
    });
    return res.data;
  };

  const commentData = useQuery<commentResponse>(["comment", boardId], getComment);
  return (
    <div className={`commentList_container ${isdarkmode && "darkmode"}`}>
      {commentData.isLoading ? (
        <Loading />
      ) : (
        commentData.data?.result.map((el) => (
          <div className={`comment ${isdarkmode && "darkmode"}`} key={el.commentId}>
            <p className="comment_content">{el.content}</p>
            <p className="comment_createdAt">{el.createAt}</p>
          </div>
        ))
      )}
      <CommentInput boardId={boardId} />
    </div>
  );
};

export default Comment;
