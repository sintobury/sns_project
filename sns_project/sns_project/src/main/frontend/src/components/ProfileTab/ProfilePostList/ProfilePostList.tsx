import "./ProfilePostList.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostList from "../../PostList/PostList";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const ProfilePostList = () => {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState("latest");
  const navigate = useNavigate();
  const location = useLocation();
  const openFilterOption = () => {
    setOpen(!open);
  };
  const changeOption = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setOption(target.innerText);
    setOpen(false);
    navigate(`${location.pathname}?option=${option}`);
  };
  const filterOption = [{ name: "최신순", value: "latest" }];

  return (
    <div className="Post_container">
      <div className="title_container">
        <p className="component_title">게시글</p>
        <div className="filter_button" onClick={openFilterOption}>
          <FilterAltIcon />
          <div className="filter_option_container">
            {open &&
              filterOption.map((el) => (
                <div className="filter_option" key={el.value} onClick={changeOption}>
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
