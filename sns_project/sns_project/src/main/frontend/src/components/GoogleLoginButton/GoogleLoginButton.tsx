import { useGoogleLogin } from "@react-oauth/google";
import Button from "../Common/Button/Button";
import { defaultInstance } from "../../interceptors/interceptors";
// import axios from "axios";

const GoogleLoginButton = () => {
  const googleLogin = useGoogleLogin({
    scope: "email profile",
    onSuccess: async ({ code }) => {
      const res = await defaultInstance.post(`/oauth2/authorization/google`, {
        code,
      });
      console.log(res.data);
    },
    onError: (error) => {
      console.log(error);
    },
    flow: "auth-code",
    ux_mode: "redirect",
  });
  // const test = () => {
  //   defaultInstance.post(`/oauth2/authorization/google`, {});
  // };
  return (
    <>
      {/* <GoogleLogin
        onSuccess={(res) => {
          console.log(res);
          console.log(res.credential);
        }}
        onError={() => {
          console.log("로그인실패");
        }}
        type="icon"
      /> */}
      <Button type="button" text="구글 로그인" design="black" onClick={googleLogin} />
    </>
  );
};

export default GoogleLoginButton;
