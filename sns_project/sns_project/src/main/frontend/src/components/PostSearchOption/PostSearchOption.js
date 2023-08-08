import { useState } from 'react';

const PostSearchOption = () => {
  const [option, setOption] = useState('글제목');
  const [openDropdown, setOpenDropdown] = useState(false);
  const PostSearchOptions = ['글제목', '작성자', '태그'];
  const handleOption = (e) => {
    setOption(e.CurrentTarget.textContent);
    setOpenDropdown(false);
  };
  return (
    <div>
      <button onClick={() => setOpenDropdown(!openDropdown)}>{option}</button>
      {openDropdown ? (
        <div>
          {PostSearchOptions.map((el, idx) => (
            <button key={idx} onClick={(e) => handleOption(e)}>
              {el}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default PostSearchOption;
