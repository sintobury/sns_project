import { useSelector } from "react-redux";
import { authInstance } from "../interceptors/interceptors";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "../redux";

interface roomResponse {
  statusCode: string;
  message: string;
  result: room[];
}

interface room {
  usernames: string[];
  roomId: string;
  roomName: string;
  img?: string;
}

export const useGetRoomList = () => {
  const loginusername = useSelector((state: RootState) => state.loginSlice.username);
  const getRoomlist = async () => {
    const res = await authInstance.get(`/room/${loginusername}`);
    return res.data;
  };

  const roomList = useQuery<roomResponse>(["roomlist", loginusername], getRoomlist);

  return { roomList };
};
