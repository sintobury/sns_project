import "./Post.css";

const Post = () => {
  return (
    <div className="post_container">
      <h3>글제목</h3>
      <div className="post_content">글내용</div>
      <div className="post_button_container">
        <button>좋아요 숫자, 좋아요 아이콘</button>
        <button>댓글 보기</button>
      </div>
    </div>
  );
};

export default Post;
