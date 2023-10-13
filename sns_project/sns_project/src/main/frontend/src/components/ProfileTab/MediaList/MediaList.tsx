import { useSelector } from "react-redux";
import "./MediaList.css";
import { RootState } from "../../../redux";

const MediaList = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  return (
    <div className={`mediaList_container ${isDarkmode && "darkmode"}`}>
      <p className="component_title">사진 및 동영상</p>
      <div className="mediaList"></div>
    </div>
  );
};

export default MediaList;
