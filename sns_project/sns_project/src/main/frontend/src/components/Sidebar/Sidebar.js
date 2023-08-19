import { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [mode, setMode] = useState('home');
  return (
    <div className="sidebar_container">
      <div className="sidebar_button_container">
        <button className="sidebar_button" onClick={() => setMode('home')}>
          home 아이콘
        </button>
        <button
          className="sidebar_button"
          onClick={() => setMode('friendList')}
        >
          friend list 아이콘
        </button>
        <button
          className="sidebar_button"
          onClick={() => setMode('bookmarkList')}
        >
          bookmark 아이콘
        </button>
      </div>
      {mode === 'friendList' ? (
        <div className="friend_list">{/*친구목록*/}</div>
      ) : null}
      {mode === 'bookmarkList' ? (
        <div className="bookmark_list">{/*북마크 채팅방리스트*/}</div>
      ) : null}
    </div>
  );
};

export default Sidebar;
