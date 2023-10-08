import { useState } from "react";
import PostSearchOption from "./PostSearchOption/PostSearchOption";
import "./PostSearch.css";
import Button from "../../Common/Button/Button";
import { useNavigate } from "react-router-dom";

const PostSearch = () => {
  const [searchword, setSearchword] = useState("");
  const navigate = useNavigate();
  const search = () => {
    navigate(`/main?searchword=${searchword}`);
  };
  const enterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
      setSearchword("");
    }
  };
  return (
    <div className="postsearch_container">
      <PostSearchOption />
      <input
        className="Post_Search"
        value={searchword}
        onChange={(e) => setSearchword(e.target.value)}
        onKeyDown={enterSearch}
      ></input>
      <Button type="button" text="검색" design="black" onClick={search} />
    </div>
  );
};

export default PostSearch;
