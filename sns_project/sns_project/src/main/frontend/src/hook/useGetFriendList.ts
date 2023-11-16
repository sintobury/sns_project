import { useSelector } from "react-redux";
import { authInstance } from "../interceptors/interceptors";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "../redux";
import { useLocation } from "react-router-dom";
import { useS3 } from "./useS3";

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
  profile: FileDTO;
}
interface FileDTO {
  id: number;
  path: string;
  name: string;
  type: string;
  size: number;
}

export const useGetFriendList = (userId: number) => {
  const loginuserId = useSelector((state: RootState) => state.loginSlice.id);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");
  const { getUrl } = useS3();
  const getFriendList = async () => {
    if (userId === loginuserId) {
      const res = await authInstance.get("/friend");
      res.data.result.map((el: FriendDTO) => {
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
      return res.data;
    } else {
      const res = await authInstance.get(`/friend/${userId}`);
      res.data.result.map((el: FriendDTO) => {
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
      return res.data;
    }
  };

  const friendlistData = useQuery<ResponseDTO>(["friendList", userId, username], getFriendList, {
    staleTime: Infinity,
  });

  return { friendlistData };
};
