import { useLocation, useNavigate } from "react-router-dom";
import "./Home_icon.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";

const Homeicon = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const navigate = useNavigate();
  const location = useLocation();
  const moveMain = () => {
    if (location.pathname === "/main") {
      window.location.reload();
    } else {
      navigate(`/main`);
    }
  };

  return (
    <div className="homeicon" onClick={moveMain}>
      <p className={`header_logo ${isDarkmode && "darkmode"}`}>SNS_Project</p>
    </div>
  );
};

export default Homeicon;
