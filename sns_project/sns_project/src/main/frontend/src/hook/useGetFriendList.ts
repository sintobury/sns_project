import { useSelector } from "react-redux";
import { authInstance } from "../interceptors/interceptors";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "../redux";
import { useLocation } from "react-router-dom";

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

export const useGetFriendList = (userId: number) => {
  const loginuserId = useSelector((state: RootState) => state.loginSlice.id);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");
  const getFriendList = async () => {
    if (userId === loginuserId) {
      const res = await authInstance.get("/friend");
      return res.data;
    } else {
      const res = await authInstance.get(`/friend/${userId}`);
      return res.data;
    }
  };

  const friendlistData = useQuery<ResponseDTO>(
    ["friendList", loginuserId, username],
    getFriendList,
    {
      staleTime: Infinity,
    },
  );

  return { friendlistData };
};
