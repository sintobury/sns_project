import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  return (
    <>
      <GoogleLogin
        // ux_mode="redirect"
        onSuccess={(res) => {
          console.log(res);
          console.log(res.credential);
        }}
        onError={() => {
          console.log("로그인실패");
        }}
        type="icon"
      />
    </>
  );
};

export default GoogleLoginButton;
