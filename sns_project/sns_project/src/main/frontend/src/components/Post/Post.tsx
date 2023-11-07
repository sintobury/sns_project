import { useState } from "react";
import "./Post.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import Comment from "../Comment/Comment";

interface childProps {
  info: board;
}

interface board {
  id: number;
  title: string;
  content: string;
  createAt: string;
  hashTag?: string;
  boardFiles?: string[];
}

const Post = ({ info }: childProps) => {
  const [open, setOpen] = useState(false);
  const isdarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  return (
    <div className="post_container">
      <h3>{info.title}</h3>
      <div className="post_content">{info.content}</div>
      <div
        className={`display_comment_button ${isdarkmode && "darkmode"}`}
        onClick={() => setOpen(!open)}
      >
        <p>댓글 보기</p>
      </div>
      {open && <Comment boardId={info.id} />}
    </div>
  );
};

export default Post;
