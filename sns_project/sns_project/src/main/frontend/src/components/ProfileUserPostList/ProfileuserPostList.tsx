import { useSelector } from "react-redux";
import { useS3 } from "../../hook/useS3";
import "./ProfileuserPostList.css";
import { RootState } from "../../redux";
import { authInstance } from "../../interceptors/interceptors";
import { useQuery } from "@tanstack/react-query";
import Post from "../Post/Post";
import Loading from "../Common/Loading/Loading";

interface childProps {
  username: string | null;
  id: number;
}

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
  boardFiles?: FileDTO[];
}

interface FileDTO {
  id: number;
  name: string;
  size: number;
  path: string;
  type: string;
}

const ProfileuserPostList = ({ username, id }: childProps) => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const { getUrl } = useS3();
  const getProfilePostList = async () => {
    const res = await authInstance.get(`/board/user/${id}`);
    console.log(res.data);
    return res.data;
  };

  const proflieUserPostList = useQuery<BoardListResponse>(
    ["profilePostList", username],
    getProfilePostList,
    {
      staleTime: Infinity,
      onSuccess: (data) => {
        data.result.map((el) => {
          if (el.boardFiles?.length !== 0) {
            el.boardFiles?.map((el) => (el.path = getUrl(el.path, el.type)));
          }
        });
      },
    },
  );

  return (
    <div className={`profile_user_postList_container ${isDarkmode && "darkmode"}`}>
      <div className="title_container">
        <p className="component_title">게시글</p>
      </div>
      <div className="profile_user_postList">
        {proflieUserPostList.isLoading ? (
          <Loading />
        ) : proflieUserPostList.data?.result.length === 0 ? (
          <div className={`notification_container ${isDarkmode && "darkmode"}`}>
            <p className={`notification ${isDarkmode && "darkmode"}`}>작성한 글이 없습니다.</p>
          </div>
        ) : (
          proflieUserPostList.data?.result.map((el) => (
            <Post info={el} isProfilePost={true} key={el.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProfileuserPostList;
