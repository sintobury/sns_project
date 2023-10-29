import { useEffect, useState } from "react";
import { authInstance } from "../interceptors/interceptors";
import axios from "axios";

export const useGetLoginUserinfo = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const getuserinfo = async () => {
    try {
      const res = await authInstance.get("/member/info");
      setUsername(res.data.result.username);
      setName(res.data.result.name);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getuserinfo();
  }, []);

  return { username, name };
};
