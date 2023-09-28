import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  return (
    <>
      <GoogleLogin
        ux_mode="redirect"
        onSuccess={(res) => {
          console.log(res);
          window.location.reload();
        }}
        onError={() => {
          (err) => {
            console.log(err);
          };
        }}
        type="icon"
      />
    </>
  );
};

export default GoogleLoginButton;
