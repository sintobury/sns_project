import { Link } from "react-router-dom";
import "./Home_icon.css";

const Homeicon = () => {
  return (
    <div className="homeicon">
      <Link to="/main" className="logo_container">
        <p className="header_logo">SNS_Project</p>
      </Link>
    </div>
  );
};

export default Homeicon;
