import "./Loading.css";
import loading from "../../../assets/images/Gear-0.8s-200px.gif";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";

const Loading = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  return (
    <div className={`loading_container ${isDarkmode && "darkmode"}`}>
      <p className="explain">로딩 중...</p>
      <img src={loading} alt="loading"></img>
    </div>
  );
};

export default Loading;
