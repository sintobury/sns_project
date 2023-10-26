import "./RequestedFriend.css";
import { useSelector } from "react-redux";
import { authInstance } from "../../../../interceptors/interceptors";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "../../../../redux";
import Button from "../../../Common/Button/Button";

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
  imgurl: string;
}
const RequestedFriend = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const getRequestedFriend = async () => {
    const res = await authInstance.get(`/friend/requested`);
    return res.data;
  };

  const requestedFriendData = useQuery<ResponseDTO>(["requestedFriendList"], getRequestedFriend, {
    staleTime: Infinity,
  });
  console.log(requestedFriendData.data);
  return (
    <div className={`requested_friend_container ${isDarkmode && "darkmode"}`}>
      <p className="component_title">친구 요청 목록</p>
      {requestedFriendData.isLoading ? null : (
        <div className="user_container">
          {requestedFriendData.data?.result.map((el) => (
            <div className={`user ${isDarkmode && "darkmode"}`} key={el.username}>
              <div className="user_info_container">
                <img className="profile_img" src={el.imgurl} alt="user_img" />
                <p className="user_name">{el.name}</p>
              </div>
              <Button text="수락" type="button" design="black" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestedFriend;
