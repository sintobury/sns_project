import "./PostList.css";
import Post from "../Post/Post";

const PostList = () => {
  return (
    <div className="postlist_container">
      {postlist.map((el) => (
        <Post info={el.info} />
      ))}
    </div>
  );
};

export default PostList;
