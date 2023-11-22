import "./Addfriend.css";
import { useSelector } from "react-redux";
import Button from "../../../Common/Button/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { grey } from "@mui/material/colors";
import { RootState } from "../../../../redux";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import { authInstance } from "../../../../interceptors/interceptors";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Common/Loading/Loading";
import { useS3 } from "../../../../hook/useS3";

interface childProps {
  setMode: Dispatch<SetStateAction<string>>;
}

interface ResponseDTO {
  statusCode: string;
  message: string;
  result: MemberDTO[];
}

interface MemberDTO {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  birth: string;
  createdAt: string;
  provider: string;
  profile: profileDTO;
}

interface profileDTO {
  id: number;
  path: string;
  name: string;
  type: string;
  size: number;
}

const Addfriend = ({ setMode }: childProps) => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const loginuserId = useSelector((state: RootState) => state.loginSlice.id);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [openidx, setOpenidx] = useState([false]);
  const navigate = useNavigate();
  const { getUrl } = useS3();

  const getSearchFriendList = async () => {
    if (searchKeyword === "") {
      const res = await authInstance.get(`/member/search`);
      return res.data;
    }
    const res = await authInstance.get(`/member/search/${searchKeyword}`);
    return res.data;
  };

  const pressEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      friendSearchData.refetch();
      setSearchKeyword("");
    }
  };

  const friendSearchData = useQuery<ResponseDTO>(
    ["searchFriendList", loginuserId],
    getSearchFriendList,
    {
      staleTime: Infinity,
      onSuccess: (data) => {
        data.result.map((el) => {
          if (el.profile === null) {
            el.profile = {
              id: 3,
              name: "file",
              path: "https://s3.ap-northeast-2.amazonaws.com/testsnsproject/42c40320-2fbd-4ca3-a8d3-6422c92b697b.jpg",
              size: 8690,
              type: "jpg",
            };
          } else {
            el.profile.path = getUrl(el.profile.path, el.profile.type);
          }
        });
      },
    },
  );

  const reqFriend = async (id: string) => {
    const res = await authInstance.post(`/friend`, {
      requestId: loginuserId,
      requestedId: id,
    });
    const newArr = new Array(friendSearchData.data?.result.length).fill(false);
    if (res.data.statusCode === 200) {
      alert("친구요청 되었습니다.");
      setOpenidx(newArr);
    } else if (res.data.statusCode === 400) {
      alert("이미 요청한 사람입니다.");
      setOpenidx(newArr);
    }
    console.log(res.data);
  };

  const navigateProfile = (username: string) => {
    const newArr = new Array(friendSearchData.data?.result.length).fill(false);
    setOpenidx(newArr);
    navigate(`/profile?username=${username}`);
  };

  const openMenu = (idx: number) => {
    const newArr = new Array(friendSearchData.data?.result.length).fill(false);
    newArr[idx] = true;
    setOpenidx(newArr);
  };

  const MenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (MenuRef.current && !MenuRef.current.contains(e.target as Node)) {
        const newArr = new Array(friendSearchData.data?.result.length).fill(false);
        setOpenidx(newArr);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [MenuRef, friendSearchData]);

  const ContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (ContainerRef.current && !ContainerRef.current.contains(e.target as Node)) {
        setMode("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ContainerRef]);

  return (
    <div className={`add_friend_container ${isDarkmode && "darkmode"}`} ref={ContainerRef}>
      <p className="component_title">전체 유저</p>
      <div className="add_friend_search_container">
        <input
          className="add_friend_input"
          placeholder="이름"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={pressEnterSearch}
        />
        <Button
          type="button"
          text="검색"
          design="black"
          onClick={() => friendSearchData.refetch()}
        />
      </div>
      {friendSearchData.isLoading ? (
        <Loading />
      ) : (
        <div className="user_container" ref={MenuRef}>
          {friendSearchData.data?.result.length === 0 && (
            <div>
              <p className="empty_message">해당되는 사용자가 없습니다.</p>
            </div>
          )}
          {friendSearchData.data?.result.map((el: MemberDTO, idx) => (
            <div className={`user ${isDarkmode && "darkmode"}`} key={el.username}>
              <div className="user_info_container">
                <img className="profile_img" src={el.profile.path} alt="user_img" />
                <p className="user_name">{el.name}</p>
              </div>
              <div className="user_button_container" onClick={() => openMenu(idx)}>
                {isDarkmode ? <MenuIcon sx={{ color: grey[800] }} /> : <MenuIcon />}
                {openidx[idx] && (
                  <div className={`user_interaction_button_container ${isDarkmode && "darkmode"}`}>
                    <div
                      className="user_interaction_button"
                      onClick={() => navigateProfile(el.username)}
                    >
                      프로필
                    </div>
                    <div className="user_interaction_button" onClick={() => reqFriend(el.id)}>
                      친구요청
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addfriend;
