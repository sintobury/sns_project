import { useState } from "react";
import "./alert.css";
const Alert = () => {
  const [openAlertList, setOpenAlertList] = useState(false);
  return (
    <div>
      <button className="alram_button" onClick={() => setOpenAlertList(!openAlertList)}>
        알림
      </button>
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
