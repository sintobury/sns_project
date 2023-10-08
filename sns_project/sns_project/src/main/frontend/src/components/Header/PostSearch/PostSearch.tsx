import { useState } from "react";
import "./PostSearch.css";
import Button from "../../Common/Button/Button";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";

const PostSearch = () => {
  const [searchword, setSearchword] = useState("");
  const [option, setOption] = useState("글제목");
  const [openDropdown, setOpenDropdown] = useState(false);
  const PostSearchOptions = [
    { name: "글제목", value: "title" },
    { name: "작성자", value: "author" },
    { name: "태그", value: "tag" },
  ];
  const navigate = useNavigate();
  const searchOption = PostSearchOptions.find((el) => el.name === option)?.value;
  const search = () => {
    navigate(`/main?searchoption=${searchOption}&searchword=${searchword}`);
  };
  const enterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
      setSearchword("");
    }
  };

  const handleOption = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setOption(target.innerText);
    setOpenDropdown(false);
  };

  const closeDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const searchOptionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (searchOptionRef.current && !searchOptionRef.current.contains(e.target as Node)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOptionRef]);

  return (
    <div className="postsearch_container">
      <div className="postsearch_options_container" ref={searchOptionRef}>
        <div onClick={closeDropdown} className="selected">
          {option}
        </div>
        {openDropdown && (
          <div className="postsearch_options_dropdown">
            {PostSearchOptions.map((el) => (
              <div
                key={el.value}
                onMouseDown={(e) => handleOption(e)}
                className="postsearch_option"
              >
                {el.name}
              </div>
            ))}
          </div>
        )}
      </div>
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
