import { useState } from "react";
import "./PostSearch.css";
import Button from "../../Common/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";

const PostSearch = () => {
  const [searchword, setSearchword] = useState("");
  const [option, setOption] = useState("내용");
  const [openDropdown, setOpenDropdown] = useState(false);
  const PostSearchOptions = [
    { name: "내용", value: "content" },
    { name: "작성자", value: "author" },
    // { name: "태그", value: "tag" },
  ];
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const navigate = useNavigate();
  const location = useLocation();
  const searchOption = PostSearchOptions.find((el) => el.name === option)?.value;
  const search = () => {
    if (searchword !== "") {
      navigate(`/search?searchoption=${searchOption}&searchword=${searchword}`);
      setSearchword("");
    }
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
  useEffect(() => {
    setSearchword("");
  }, [location]);

  return (
    <div className="postsearch_container">
      <div
        className={`postsearch_options_container ${isDarkmode && "darkmode"}`}
        ref={searchOptionRef}
      >
        <div onClick={closeDropdown} className={`selected ${isDarkmode && "darkmode"}`}>
          {option}
        </div>
        {openDropdown && (
          <div className="postsearch_options_dropdown">
            {PostSearchOptions.map((el) => (
              <div
                key={el.value}
                onMouseDown={(e) => handleOption(e)}
                className={`postsearch_option ${isDarkmode && "darkmode"}`}
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
