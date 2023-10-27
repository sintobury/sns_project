import "./RequestedFriend.css";
import { useSelector } from "react-redux";
import { authInstance } from "../../../../interceptors/interceptors";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "../../../../redux";
import Button from "../../../Common/Button/Button";

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
  list: MemberDTO[];
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
  imgurl: string;
}

const RequestedFriend = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const loginUserId = useSelector((state: RootState) => state.loginSlice.id);
  const getRequestedFriend = async () => {
    const res = await authInstance.get(`/friend/requested`);
    return res.data;
  };

  const acceptFriendRequest = async (friendData: FriendDTO) => {
    const res = await authInstance.post(`/friend/accept`, { id: friendData.id });
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
    },
  );
  console.log(requestedFriendData.data);
  return (
    <div className={`requested_friend_container ${isDarkmode && "darkmode"}`}>
      <p className="component_title">친구 요청 목록</p>
      {requestedFriendData.isLoading ? null : (
        <div className="user_container">
          {requestedFriendData.data && requestedFriendData.data.result.length === 0 && (
            <div>
              <p className="empty_message">받은 친구 요청이 없습니다.</p>
            </div>
          )}
          {requestedFriendData.data &&
            requestedFriendData.data.result.map((el: FriendDTO) => (
              <div className={`user ${isDarkmode && "darkmode"}`} key={el.member.username}>
                <div className="user_info_container">
                  <img className="profile_img" src={el.member.imgurl} alt="user_img" />
                  <p className="user_name">{el.member.name}</p>
                </div>
                <Button
                  text="수락"
                  type="button"
                  design="black"
                  onClick={() => acceptFriendRequest(el)}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default RequestedFriend;
