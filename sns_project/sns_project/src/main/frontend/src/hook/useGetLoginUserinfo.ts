import { useState } from "react";
import { authInstance } from "../interceptors/interceptors";
import axios from "axios";

interface userinfo {
  username: string;
  name: string;
  roomId: string;
  message: string;
}

export const useGetLoginUserinfo = () => {
  const [userinfo, setUserinfo] = useState<userinfo>({
    username: "",
    name: "",
    roomId: "",
    message: "",
  });
  const getuserinfo = async () => {
    try {
      const res = await authInstance.get("/member/info");
      setUserinfo(res.data);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };
  getuserinfo();
  return userinfo;
};
