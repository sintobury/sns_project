import { Link } from "react-router-dom";
import "./Home_icon.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";

const Homeicon = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  return (
    <div className="homeicon">
      <Link to="/main" className="logo_container">
        <p className={`header_logo ${isDarkmode && "darkmode"}`}>SNS_Project</p>
      </Link>
    </div>
  );
};

export default Homeicon;
