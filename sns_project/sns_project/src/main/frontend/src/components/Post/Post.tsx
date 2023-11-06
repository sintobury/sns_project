import "./Post.css";

interface childProps {
  info: board;
}

interface board {
  id?: number;
  title: string;
  content: string;
  createAt: string;
  hashTag?: string;
  boardFiles?: string[];
}

const Post = ({ info }: childProps) => {
  return (
    <div className="post_container">
      <h3>{info.title}</h3>
      <div className="post_content">{info.content}</div>
      <div className="post_button_container">
        <button>좋아요 숫자, 좋아요 아이콘</button>
        <button>댓글 보기</button>
      </div>
    </div>
  );
};

export default Post;
