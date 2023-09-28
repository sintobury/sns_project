import { useState } from "react";
import PostSearchOption from "./PostSearchOption/PostSearchOption";
import "./PostSearch.css";

const PostSearch = () => {
  const [searchword, setSearchword] = useState("");

  return (
    <div className="postsearch_container">
      <PostSearchOption />
      <input
        className="Post_Search"
        value={searchword}
        onChange={(e) => setSearchword(e.target.value)}
      ></input>
      <button className="search_button">검색</button>
    </div>
  );
};

export default PostSearch;
