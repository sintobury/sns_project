import { useState } from 'react';

const PostSearch = () => {
  const [searchword, setSearchword] = useState('');

  return (
    <div>
      {/* todo: dropdown option */}
      <input
        className="Post_Search"
        value={searchword}
        onChange={(e) => setSearchword(e.target.value)}
      ></input>
      <button>검색</button>
    </div>
  );
};

export default PostSearch;
