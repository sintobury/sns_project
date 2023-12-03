import { useSelector } from "react-redux";
import "./ProfilePostList.css";
import { RootState } from "../../../redux";
import { authInstance } from "../../../interceptors/interceptors";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loading from "../../Common/Loading/Loading";
import Post from "../../Post/Post";
import { useS3 } from "../../../hook/useS3";

interface childProps {
  username: string | null;
  id: number;
}

// interface infiniteResponse {
//   pages: BoardListResponse;
// }

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

const ProfilePostList = ({ username, id }: childProps) => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const { getUrl } = useS3();

  const getProfilePostList = async (page: number) => {
    const res = await authInstance.get(`/board/user/${id}?pageStart=${page}&pageCount=3`);
    return res.data;
  };

  const proflieUserPostList = useInfiniteQuery(
    ["profilePostList", username],
    ({ pageParam = 0 }) => getProfilePostList(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage;
      },
      onSuccess: (data) => {
        data.pages.map((el: BoardListResponse) => {
          el.result.map((el: Board) => {
            if (el.boardFiles?.length !== 0) {
              el.boardFiles?.map((el) => (el.path = getUrl(el.path)));
            }
          });
        });
      },
    },
  );
  console.log(proflieUserPostList?.data?.pages[0]);

  return (
    <div className={`Post_container ${isDarkmode && "darkmode"}`}>
      <div className="title_container">
        <p className="component_title">게시글</p>
      </div>
      <div className="postList_container">
        {proflieUserPostList.isLoading ? (
          <Loading />
        ) : proflieUserPostList.data?.pages.length === 0 ? (
          <div className={`notification_container ${isDarkmode && "darkmode"}`}>
            <p className={`notification ${isDarkmode && "darkmode"}`}>작성한 글이 없습니다.</p>
          </div>
        ) : (
          proflieUserPostList.data?.pages.map((el: BoardListResponse) =>
            el.result.map((el) => (
              <Post info={el} isProfilePost={false} profileId={id} key={el.id} />
            )),
          )
        )}
      </div>
    </div>
  );
};

export default ProfilePostList;
