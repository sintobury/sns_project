import { useState } from 'react';
import './Postmaker.css';

const Postmaker = () => {
  const [inputVal, setInputVal] = useState({
    title: '',
    content: '',
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputVal({ ...inputVal, [name]: value });
  };
  return (
    <div className="postmaker_container">
      <div className="postmaker_propile_container">
        <img src="" alt="propile"></img>
      </div>
      <div className="postmaker_input_container">
        <input
          className="title_input"
          placeholder="제목을 입력하세요"
          name="title"
          value={inputVal.title}
          onChange={handleInput}
        ></input>
        <textarea
          className="content_input"
          placeholder="내용을 입력하세요"
          name="content"
          value={inputVal.content}
          onChange={handleInput}
        ></textarea>
      </div>
      <div className="postmaker_button_container">
        <div className="post_button_container">
          <button className="post_button">작성 하기</button>
        </div>
        <div className="content_option_button_container">
          <button className="content_option_button">미디어 추가</button>
          <button className="content_option_button">파일 추가</button>
          <button className="content_option_button">태그 추가</button>
        </div>
      </div>
    </div>
  );
};
export default Postmaker;
