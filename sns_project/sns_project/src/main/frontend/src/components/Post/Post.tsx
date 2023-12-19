import { useState } from "react";
import "./Post.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import Comment from "../Comment/Comment";
import { useS3 } from "../../hook/useS3";

interface childProps {
  info: board;
}

interface board {
  id: number;
  title: string;
  content: string;
  createAt: string;
  hashTag?: string;
  boardFiles?: FileDTO[];
}

interface FileDTO {
  id: number;
  name: string;
  size: number;
  path: string;
  type: string;
}

const Post = ({ info }: childProps) => {
  const [open, setOpen] = useState(false);
  const isdarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const { getUrl } = useS3();
  if (info.boardFiles?.length !== 0) {
    info.boardFiles?.map((el) => (el.path = getUrl(el.path, el.type)));
  }
  return (
    <div className={`post_container ${isdarkmode && "darkmode"}`}>
      <p className={`post_title ${isdarkmode && "darkmode"}`}>{info.title}</p>
      <div className={`post_content ${isdarkmode && "darkmode"}`}>{info.content}</div>
      <div
        className={`display_comment_button ${isdarkmode && "darkmode"}`}
        onClick={() => setOpen(!open)}
      >
        {open ? <p>댓글 접기</p> : <p>댓글 펼치기</p>}
      </div>
      {open && <Comment boardId={info.id} />}
    </div>
  );
};

export default Post;
