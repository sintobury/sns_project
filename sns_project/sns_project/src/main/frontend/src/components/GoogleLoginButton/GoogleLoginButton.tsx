// import { useGoogleLogin } from "@react-oauth/google";
// import { useLocation } from "react-router-dom";
import Button from "../Common/Button/Button";
// import { defaultInstance } from "../../interceptors/interceptors";

const GoogleLoginButton = () => {
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const googleLogin = useGoogleLogin({
  //   scope: "email profile",
  //   onSuccess: async ({ code }) => {
  //     const res = await defaultInstance.post(`/oauth2/authorization/google`, {
  //       code,
  //     });
  //     console.log(res.data);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  //   flow: "auth-code",
  // });
  // const test = () => {
  //   defaultInstance.post(`/oauth2/authorization/google`, {});
  // };
  const test = async () => {
    location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/google?redirect_uri=http://localhost:3000/oauth`;
    // const res = await defaultInstance.get(
    //   `/oauth2/authorization/google?redirect_uri=http://localhost:3000/oauth`,
    // );
    // console.log(res);
    // 구글 로그인후 구글 api로 토큰 가져와서 등록시키기?
    const url = location.href;
    console.log(url);
  };
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
      <Button type="button" text="구글 로그인" design="black" onClick={test} />
    </>
  );
};

export default GoogleLoginButton;
