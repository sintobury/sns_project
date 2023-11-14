import "./PostList.css";
import Post from "../Post/Post";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { authInstance } from "../../interceptors/interceptors";
import Loading from "../Common/Loading/Loading";
import { useLocation } from "react-router-dom";

interface BoardListResponse {
  message: string;
  statusCode: number;
  result: Board[];
}

interface Board {
  id: number;
  title: string;
  content: string;
  createAt: string;
  hashTag?: string;
  boardFiles?: string[];
}

const PostList = () => {
  const loginusername = useSelector((state: RootState) => state.loginSlice.username);
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchOption = searchParams.get("searchoption");
  const keyword = searchParams.get("searchword");

  const getPostList = async () => {
    if (searchOption === "author") {
      const res = await authInstance.get(`/board/${keyword}`);
      return res.data;
    } else if (searchOption === "content") {
      const res = await authInstance.get(`/board/content/${keyword}`);
      return res.data;
    } else {
      const res = await authInstance.get(`/board/friend`);
      return res.data;
    }
  };

  const postList = useQuery<BoardListResponse>(
    ["postList", loginusername, searchOption, keyword],
    getPostList,
    {
      staleTime: Infinity,
    },
  );
  return (
    <div className="postlist_container">
      {postList.isLoading ? (
        <Loading />
      ) : postList.data?.result.length === 0 ? (
        <div className={`notification_container ${isDarkmode && "darkmode"}`}>
          <p className={`notification ${isDarkmode && "darkmode"}`}>작성된 글이 없습니다.</p>
        </div>
      ) : (
        postList.data?.result.map((el) => <Post info={el} key={el.id} />)
      )}
    </div>
  );
};

export default PostList;
