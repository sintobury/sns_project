// import { useGoogleLogin } from "@react-oauth/google";
import Button from "../Common/Button/Button";
// import { defaultInstance } from "../../interceptors/interceptors";
// import axios from "axios";

const GoogleLoginButton = () => {
  // const googleLogin = useGoogleLogin({
  //   scope: "email profile",
  //   onSuccess: async ({ code }) => {
  //     const res = await defaultInstance.post(`login/oauth2/code/google`, {
  //       code,
  //     });
  //     console.log(res.data);
  //     console.log(res);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  //   flow: "auth-code",
  //   ux_mode: "redirect",
  //   redirect_uri: `${process.env.REACT_APP_API_URL}/login/oauth2/code/google`,
  // });
  // const test = () => {
  //   defaultInstance.post(`/oauth2/authorization/google`, {});
  // };
  const test = async () => {
    // const res = await defaultInstance.get(
    //   `/oauth2/authorization/google?redirect_uri=http://localhost:3000`,

    // `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`,
    // );
    location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/google?redirect_uri=http://localhost:3000/oauth`;
    // const res = await defaultInstance.post(
    //   `/oauth2/authorization/google?redirect_uri=http://localhost:3000/oauth`,
    // );
    // console.log(res);
  };
  return (
    <>
      <Button type="button" text="구글 로그인" design="black" onClick={test} />
    </>
  );
};

export default GoogleLoginButton;
