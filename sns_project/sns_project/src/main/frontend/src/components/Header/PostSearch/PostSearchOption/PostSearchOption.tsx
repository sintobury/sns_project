import { useEffect, useRef, useState } from "react";
import "./PostSearchOption.css";

const PostSearchOption = () => {
  const [option, setOption] = useState("글제목");
  const [openDropdown, setOpenDropdown] = useState(false);
  const PostSearchOptions = [
    { name: "글제목", value: "title" },
    { name: "작성자", value: "author" },
    { name: "태그", value: "tag" },
  ];
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
    <div className="postsearch_options_container" ref={searchOptionRef}>
      <div onClick={closeDropdown} className="selected">
        {option}
      </div>
      {openDropdown && (
        <div className="postsearch_options_dropdown">
          {PostSearchOptions.map((el) => (
            <div key={el.value} onMouseDown={(e) => handleOption(e)} className="postsearch_option">
              {el.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default PostSearchOption;
