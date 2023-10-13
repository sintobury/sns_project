import { useState } from "react";
import "./alert.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { yellow, grey } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";

const Alert = () => {
  const [openAlertList, setOpenAlertList] = useState(false);
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  return (
    <div className="alert_button" onClick={() => setOpenAlertList(!openAlertList)}>
      {isDarkmode ? (
        <NotificationsIcon sx={{ color: grey[500] }} />
      ) : (
        <NotificationsIcon sx={{ color: yellow[700] }} />
      )}
      {openAlertList ? (
        <div>
          {/* 태그된 글이 생성되었을때 알림창 보내기
    잘몰라서 찾아봐야함 */}
        </div>
      ) : null}
    </div>
  );
};
export default Alert;
