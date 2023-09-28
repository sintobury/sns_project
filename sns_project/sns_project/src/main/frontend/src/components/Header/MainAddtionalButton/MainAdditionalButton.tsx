import LogoutButton from "../LogoutButton/LogoutButton";
import "./MainAdditionalButton.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainAdditionalButton = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const handlePropileButton = () => {
    navigate("/propile");
  };
  return (
    <div className="additional_menu">
      <button className="additional_button" onClick={() => setOpenMenu(!openMenu)}>
        더보기
      </button>
      {openMenu ? (
        <div className="hamburgur_menu">
          <button className="menu" onClick={handlePropileButton}>
            프로필
          </button>
          <LogoutButton />
          <button className="menu">darkmode</button>
        </div>
      ) : null}
    </div>
  );
};

export default MainAdditionalButton;
