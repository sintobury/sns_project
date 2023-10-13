import { useSelector } from "react-redux";
import "./Summary.css";
import { RootState } from "../../../redux";

const Summary = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  return (
    <div className={`summary_container ${isDarkmode && "darkmode"}`}>
      <p className="component_title">프로필</p>
      <div className="introduce_container">
        <p className="introduce"></p>
      </div>
      <div className="info_container"></div>
    </div>
  );
};

export default Summary;
