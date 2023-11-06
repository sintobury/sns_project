import { useSelector } from "react-redux";
import "./ProfilePostList.css";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostList from "../../PostList/PostList";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { RootState } from "../../../redux";

interface childProps {
  username: string | null;
}

const ProfilePostList = ({ username }: childProps) => {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState("latest");
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const navigate = useNavigate();
  const location = useLocation();
  const openFilterOption = () => {
    setOpen(!open);
  };
  const changeOption = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setOption(target.innerText);
    setOpen(false);
    navigate(`${location.pathname}?username=${username}&option=${option}`);
  };
  const filterOption = [{ name: "최신순", value: "latest" }];

  const postlistOptionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (postlistOptionRef.current && !postlistOptionRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [postlistOptionRef]);

  return (
    <div className={`Post_container ${isDarkmode && "darkmode"}`}>
      <div className="title_container">
        <p className="component_title">게시글</p>
        <div className="filter_button" onClick={openFilterOption} ref={postlistOptionRef}>
          <FilterAltIcon />
          <div className="filter_option_container">
            {open &&
              filterOption.map((el) => (
                <div
                  className={`filter_option ${isDarkmode && "darkmode"}`}
                  key={el.value}
                  onClick={changeOption}
                >
                  {el.name}
                </div>
              ))}
          </div>
        </div>
      </div>
      <PostList />
    </div>
  );
};

export default ProfilePostList;
