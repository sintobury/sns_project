import "./MainAdditionalButton.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutButton from "../LogoutButton/LogoutButton";

const MainAdditionalButton = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const navigateProfileButton = () => {
    navigate("/profile");
    setOpenMenu(false);
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
    <div className="additional_menu" ref={MenuRef}>
      <div className="additional_button" onClick={() => setOpenMenu(!openMenu)}>
        <MenuIcon />
      </div>
      {openMenu && (
        <div className="hamburgur_menu">
          <div className="menu" onClick={navigateProfileButton}>
            프로필
          </div>
          <div className="menu">darkmode</div>
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default MainAdditionalButton;
