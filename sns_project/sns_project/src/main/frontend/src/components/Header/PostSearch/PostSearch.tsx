import { useState } from "react";
import PostSearchOption from "./PostSearchOption/PostSearchOption";
import "./PostSearch.css";
import Button from "../../Common/Button/Button";

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
      <Button type="button" text="검색" design="black" />
    </div>
  );
};

export default PostSearch;
