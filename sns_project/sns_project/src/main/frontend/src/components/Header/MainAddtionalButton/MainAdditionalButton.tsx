import "./MainAdditionalButton.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { toggleDarkmode } from "../../../redux/reducers/darkmode";
import { grey } from "@mui/material/colors";

const MainAdditionalButton = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const navigateProfile = () => {
    navigate("/profile");
    setOpenMenu(false);
  };
  const setDarkmode = () => {
    dispatch(toggleDarkmode());
  };
  const MenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (MenuRef.current && !MenuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [MenuRef]);
  return (
    <div className={`additional_menu ${isDarkmode && "darkmode"}`} ref={MenuRef}>
      <div
        className={`additional_button ${isDarkmode && "darkmode"}`}
        onClick={() => setOpenMenu(!openMenu)}
      >
        {isDarkmode ? <MenuIcon sx={{ color: grey[500] }} /> : <MenuIcon />}
      </div>
      {openMenu && (
        <div className={`hamburgur_menu ${isDarkmode && "darkmode"}`}>
          <div className={`menu ${isDarkmode && "darkmode"}`} onClick={navigateProfile}>
            프로필
          </div>
          <div className={`menu ${isDarkmode && "darkmode"}`} onClick={setDarkmode}>
            <p className="menu_title">다크모드</p>
            <div className={`toggle_container ${isDarkmode && "darkmode"}`}>
              <div className={`toggle_circle ${isDarkmode && "darkmode"}`}></div>
            </div>
          </div>
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default MainAdditionalButton;
