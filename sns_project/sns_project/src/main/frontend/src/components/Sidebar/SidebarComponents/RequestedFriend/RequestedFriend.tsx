import "./RequestedFriend.css";
import { useSelector } from "react-redux";
import { authInstance } from "../../../../interceptors/interceptors";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RootState } from "../../../../redux";
import Button from "../../../Common/Button/Button";
import Loading from "../../../Common/Loading/Loading";
import { useS3 } from "../../../../hook/useS3";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface childProps {
  setMode: Dispatch<SetStateAction<string>>;
}
interface ResponseDTO {
  statusCode: string;
  message: string;
  result: FriendDTO[];
}

interface FriendDTO {
  id: string;
  member: MemberDTO;
  request: boolean;
  state: string;
  // list: MemberDTO[];
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
  profile: FileDTO;
}

interface FileDTO {
  id: number;
  path: string;
  name: string;
  type: string;
  size: number;
}

const RequestedFriend = ({ setMode }: childProps) => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const loginUserId = useSelector((state: RootState) => state.loginSlice.id);
  const queryClient = useQueryClient();
  const { getUrl } = useS3();
  const getRequestedFriend = async () => {
    const res = await authInstance.get(`/friend/requested`);
    return res.data;
  };

  const acceptFriendRequest = async (friendData: FriendDTO) => {
    const res = await authInstance.post(`/friend/accept`, { id: friendData.id });
    if (res.data.statusCode === 200) {
      alert(res.data.message);
      requestedFriendData.refetch();
      queryClient.refetchQueries(["friendList"]);
    }
  };

  const refuseFriendRequest = async (friendData: FriendDTO) => {
    const res = await authInstance.delete(`/friend`, {
      data: { id: friendData.id },
    });
    if (res.data.statusCode === 200) {
      alert(res.data.message);
      requestedFriendData.refetch();
    }
  };

  const requestedFriendData = useQuery<ResponseDTO>(
    ["requestedFriendList", loginUserId],
    getRequestedFriend,
    {
      staleTime: Infinity,
      onSuccess: (data) => {
        data.result.map((el) => {
          if (el.member.profile === null) {
            el.member.profile = {
              id: 3,
              name: "file",
              path: "https://s3.ap-northeast-2.amazonaws.com/testsnsproject/42c40320-2fbd-4ca3-a8d3-6422c92b697b.jpg",
              size: 8690,
              type: "jpg",
            };
          } else {
            el.member.profile.path = getUrl(el.member.profile.path, el.member.profile.type);
          }
        });
      },
    },
  );

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
    <div className={`requested_friend_container ${isDarkmode && "darkmode"}`} ref={ContainerRef}>
      <p className="component_title">친구 요청 목록</p>
      {requestedFriendData.isLoading ? (
        <Loading />
      ) : (
        <div className="user_container">
          {requestedFriendData.data && requestedFriendData.data.result.length === 0 && (
            <p className="empty_message">받은 친구 요청이 없습니다.</p>
          )}
          {requestedFriendData.data &&
            requestedFriendData.data.result.map((el: FriendDTO) => (
              <div className={`user ${isDarkmode && "darkmode"}`} key={el.member.username}>
                <div className="user_info_container">
                  <img className="profile_img" src={el.member.profile.path} alt="user_img" />
                  <p className="user_name">{el.member.name}</p>
                </div>
                <Button
                  text="수락"
                  type="button"
                  design="black"
                  onClick={() => acceptFriendRequest(el)}
                />
                <Button
                  text="거절"
                  type="button"
                  design="black"
                  onClick={() => refuseFriendRequest(el)}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default RequestedFriend;
