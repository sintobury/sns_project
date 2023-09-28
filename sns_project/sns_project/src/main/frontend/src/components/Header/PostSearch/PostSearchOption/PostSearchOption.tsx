import { useState } from "react";
import "./PostSearchOption.css";

const PostSearchOption = () => {
  const [option, setOption] = useState("글제목");
  const [openDropdown, setOpenDropdown] = useState(false);
  const PostSearchOptions = [
    { name: "글제목", value: "title" },
    { name: "작성자", value: "author" },
    { name: "태그", value: "tag" },
  ];
  const handleOption = (e) => {
    setOption(e.target.innerText);
    setOpenDropdown(false);
  };
  return (
    <div className="postsearch_options_container" onBlur={() => setOpenDropdown(false)}>
      <button onClick={() => setOpenDropdown(!openDropdown)} className="selected">
        {option}
      </button>
      {openDropdown ? (
        <div className="postsearch_options_dropdown">
          {PostSearchOptions.map((el) => (
            <button
              key={el.value}
              onMouseDown={(e) => handleOption(e)}
              className="postsearch_option"
            >
              {el.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default PostSearchOption;
