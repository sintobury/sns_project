import Homeicon from "./Home_Icon/Home_icon";
import PostSearch from "./PostSearch/PostSearch";
import ChatSettingButton from "./ChatSettingButton/ChatSettingButton";
import Alert from "./alert/alert";
import "./Header.css";
import MainAdditionalButton from "./MainAddtionalButton/MainAdditionalButton";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

const Header = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  return (
    <div className={`header_wrapper ${isDarkmode && "darkmode"}`}>
      <header className="header_container">
        <Homeicon />
        <div className="header_function">
          <PostSearch />
          <div className="optional_button_container">
            <ChatSettingButton />
            <Alert />
            <MainAdditionalButton />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
