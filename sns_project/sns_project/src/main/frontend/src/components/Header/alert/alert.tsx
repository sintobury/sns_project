import { useState } from "react";
import "./alert.css";
import Button from "../../Common/Button/Button";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { yellow } from "@mui/material/colors";

const Alert = () => {
  const [openAlertList, setOpenAlertList] = useState(false);
  return (
    <div>
      <Button
        type="button"
        text="알림"
        icon={<NotificationsIcon sx={{ color: yellow[700], fontSize: "16px" }} />}
        onClick={() => setOpenAlertList(!openAlertList)}
      />

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
