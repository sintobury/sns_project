import "./Loading.css";
import loading from "../../../assets/images/Gear-0.8s-200px.gif";

const Loading = () => {
  return (
    <div className="loading_container">
      <p className="explain">로딩 중...</p>
      <img src={loading} alt="loading"></img>
    </div>
  );
};

export default Loading;
