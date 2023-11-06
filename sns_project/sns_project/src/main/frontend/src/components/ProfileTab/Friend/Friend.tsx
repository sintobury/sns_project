import { useSelector } from "react-redux";
import "./Friend.css";
import { RootState } from "../../../redux";
import { useGetFriendList } from "../../../hook/useGetFriendList";
import Loading from "../../Common/Loading/Loading";
import Button from "../../Common/Button/Button";
import { useNavigate } from "react-router-dom";

interface childProps {
  userId: number;
  username: string | null;
}

const Friend = ({ userId, username }: childProps) => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const { friendlistData } = useGetFriendList(userId);
  const navigate = useNavigate();
  const navigateFriendTab = () => {
    navigate(`/profile?username=${username}&tabmenu=friend`);
  };

  const navigateProfile = (username: string) => {
    friendlistData.refetch();
    navigate(`/profile?username=${username}`);
  };

  return (
    <div className={`friend_container ${isDarkmode && "darkmode"}`}>
      <p className="component_title">친구</p>
      <div className="friendList">
        {friendlistData.isLoading ? (
          <Loading />
        ) : friendlistData.data && friendlistData.data.result.length < 3 ? (
          friendlistData.data.result.map((el) => (
            <div
              className={`profile_user_friend ${isDarkmode && "darkmode"}`}
              onClick={() => navigateProfile(el.member.username)}
              key={el.id}
            >
              <img
                alt={`${el.member.name} profile`}
                src={el.member.imgurl}
                className="profile_img"
              />
              <p className="friend_name">{el.member.name}</p>
            </div>
          ))
        ) : (
          friendlistData.data &&
          friendlistData.data.result.slice(0, 3).map((el, idx) =>
            idx !== 2 ? (
              <div
                className={`profile_user_friend ${isDarkmode && "darkmode"}`}
                onClick={() => navigateProfile(el.member.username)}
                key={el.id}
              >
                <img
                  alt={`${el.member.name} profile`}
                  src={el.member.imgurl}
                  className="profile_img"
                />
                <p className="friend_name">{el.member.name}</p>
              </div>
            ) : (
              <Button text="+" type="button" design="green" onClick={navigateFriendTab} />
            ),
          )
        )}
      </div>
    </div>
  );
};

export default Friend;
