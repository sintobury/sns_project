import { useEffect, useRef, useState } from "react";
import "./ChatSettingButton.css";

const ChatSettingButton = () => {
  const [openSetting, setOpenSetting] = useState(false);
  const [title, setTitle] = useState("");
  const chatMakerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (chatMakerRef.current && !chatMakerRef.current.contains(e.target as Node)) {
        setOpenSetting(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [chatMakerRef]);
  return (
    <div className="set_chat_container" ref={chatMakerRef}>
      <button onClick={() => setOpenSetting(!openSetting)} className="add_chat_button">
        채팅방 추가
      </button>
      {openSetting ? (
        <div className="options_container">
          <div className="chatroom_name">
            <textarea
              placeholder="채팅방 이름"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
            <button>만들기</button>
          </div>
          <ul>{/* 친구 목록 체크박스 있는 형태로 띄워주기 */}</ul>
        </div>
      ) : null}
    </div>
  );
};
export default ChatSettingButton;
