import { useSelector } from "react-redux";
import "./Comment.css";
import { RootState } from "../../redux";
import { authInstance } from "../../interceptors/interceptors";
import { useInfiniteQuery } from "@tanstack/react-query";
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
  const pageCount = 50;
  const getComment = async (page: number) => {
    const res = await authInstance.get(
      `/comment/${boardId}?pageStart=${page}&pageCount=${pageCount}`,
    );
    return res.data;
  };

  const commentData = useInfiniteQuery(
    ["comment", boardId],
    ({ pageParam = 0 }) => getComment(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + pageCount;
        return lastPage.result.length !== 0 ? nextPage : undefined;
      },
    },
  );
  console.log(commentData);

  return (
    <div className={`commentList_container ${isdarkmode && "darkmode"}`}>
      {commentData.isLoading ? (
        <Loading />
      ) : commentData.data?.pages.length === 0 ? (
        <div className={`notification_container ${isdarkmode && "darkmode"}`}>
          <p className={`notification ${isdarkmode && "darkmode"}`}>작성된 댓글이 없습니다.</p>
        </div>
      ) : (
        commentData.data?.pages.map((el: commentResponse) =>
          el.result.map((el: comment) => (
            <div className={`comment ${isdarkmode && "darkmode"}`} key={el.commentId}>
              <p className="comment_content">{el.content}</p>
              <p className="comment_createdAt">{el.createAt}</p>
            </div>
          )),
        )
      )}
      <CommentInput boardId={boardId} />
    </div>
  );
};

export default Comment;
