import { useEffect, useState } from "react";
import { authInstance } from "../interceptors/interceptors";
import axios from "axios";
import { useS3 } from "./useS3";

interface FileDTO {
  id?: number;
  path: string;
  name: string;
  type: string;
  size?: number;
}

export const useGetLoginUserinfo = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [profile, setProfile] = useState<FileDTO>({
    id: 3,
    name: "file",
    path: "https://s3.ap-northeast-2.amazonaws.com/testsnsproject/42c40320-2fbd-4ca3-a8d3-6422c92b697b.jpg",
    size: 8690,
    type: "jpg",
  });
  const { getUrl } = useS3();

  const getuserinfo = async () => {
    try {
      const res = await authInstance.get("/member/info");
      setUsername(res.data.result.username);
      setName(res.data.result.name);
      if (res.data.result.profile !== null) {
        const loginUserProfile = res.data.result.profile;
        loginUserProfile.path = getUrl(loginUserProfile.path);
        setProfile(loginUserProfile);
      }
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

  return { username, name, profile };
};
