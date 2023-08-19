import Homeicon from '../Home_Icon/Home_icon';
import PostSearch from '../PostSearch/PostSearch';
import ChatSettingButton from '../ChatSettingButton/ChatSettingButton';
import Alert from '../alert/alert';
import './Header.css';

const Header = () => {
  return (
    <header className="header_container">
      <Homeicon />
      <div className="search_part">
        <PostSearch />
      </div>
      <div className="optional_button_container">
        <ChatSettingButton />
        <Alert />
      </div>
    </header>
  );
};

export default Header;