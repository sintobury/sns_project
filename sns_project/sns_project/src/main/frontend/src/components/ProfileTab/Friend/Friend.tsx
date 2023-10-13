import { useSelector } from "react-redux";
import "./Friend.css";
import { RootState } from "../../../redux";

const Friend = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  return (
    <div className={`friend_container ${isDarkmode && "darkmode"}`}>
      <p className="component_title">친구</p>
      <div className="friendList"></div>
    </div>
  );
};

export default Friend;
