import { useSelector } from "react-redux";
import "./ProfilePostList.css";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { RootState } from "../../../redux";
import { authInstance } from "../../../interceptors/interceptors";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Common/Loading/Loading";
import Post from "../../Post/Post";
import { useS3 } from "../../../hook/useS3";

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

const ProfilePostList = ({ username, id }: childProps) => {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState("latest");
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const navigate = useNavigate();
  const location = useLocation();
  const filterOption = [{ name: "최신순", value: "latest" }];
  const { getUrl } = useS3();

  const openFilterOption = () => {
    setOpen(!open);
  };
  const changeOption = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setOption(target.innerText);
    setOpen(false);
    navigate(`${location.pathname}?username=${username}&option=${option}`);
  };

  const getProfilePostList = async () => {
    const res = await authInstance.get(`/board/user/${id}`);
    console.log(res.data);
    return res.data;
  };

  const proflieUserPostList = useQuery<BoardListResponse>(
    ["profilePostList", username, option],
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

  const postlistOptionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (postlistOptionRef.current && !postlistOptionRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [postlistOptionRef]);

  return (
    <div className={`Post_container ${isDarkmode && "darkmode"}`}>
      <div className="title_container">
        <p className="component_title">게시글</p>
        <div className="filter_button" onClick={openFilterOption} ref={postlistOptionRef}>
          <FilterAltIcon />
          <div className="filter_option_container">
            {open &&
              filterOption.map((el) => (
                <div
                  className={`filter_option ${isDarkmode && "darkmode"}`}
                  key={el.value}
                  onClick={changeOption}
                >
                  {el.name}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="postList_container">
        {proflieUserPostList.isLoading ? (
          <Loading />
        ) : proflieUserPostList.data?.result.length === 0 ? (
          <div className={`notification_container ${isDarkmode && "darkmode"}`}>
            <p className={`notification ${isDarkmode && "darkmode"}`}>작성한 글이 없습니다.</p>
          </div>
        ) : (
          proflieUserPostList.data?.result.map((el) => (
            <Post info={el} isProfilePost={false} key={el.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePostList;
