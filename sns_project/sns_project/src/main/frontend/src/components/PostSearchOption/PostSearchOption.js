import { useState } from 'react';

const PostSearchOption = () => {
  const [option, setOption] = useState('글제목');
  const [openDropdown, setOpenDropdown] = useState(false);
  const PostSearchOptions = [
    { name: '글제목', value: 'title' },
    { name: '작성자', value: 'author' },
    { name: '태그', value: 'tag' },
  ];
  const handleOption = (e) => {
    setOption(e.target.innerText);
    setOpenDropdown(false);
  };
  return (
    <div>
      <button onClick={() => setOpenDropdown(!openDropdown)}>{option}</button>
      {openDropdown ? (
        <div>
          {PostSearchOptions.map((el) => (
            <button key={el.value} onClick={(e) => handleOption(e)}>
              {el.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default PostSearchOption;
