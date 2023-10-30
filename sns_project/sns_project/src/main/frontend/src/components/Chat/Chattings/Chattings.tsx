import { useSelector } from "react-redux";
import "./Chattings.css";
import { RootState } from "../../../redux";
import { useQuery } from "@tanstack/react-query";
import { authInstance } from "../../../interceptors/interceptors";
import { useEffect, useRef } from "react";

interface ResponseDTO {
  statusCode: string;
  message: string;
  result: chatting[];
}

interface chatting {
  sender: string;
  senderName: string;
  roomId: string;
  message: string;
}

const Chattings = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const loginUser = useSelector((state: RootState) => state.loginSlice.username);
  const roomId = useSelector((state: RootState) => state.chatRoomSlice.roomId);
  const chattingRef = useRef<HTMLDivElement | null>(null);

  const getChattingLog = async () => {
    const res = await authInstance.get(`/room/logs/${roomId}`);
    return res.data;
  };
  const chattingData = useQuery<ResponseDTO>(["chattings", roomId], getChattingLog);
  useEffect(() => {
    chattingRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chattingData]);
  return (
    <div className={`chatting_container ${isDarkmode && "darkmode"}`}>
      {chattingData.data?.result
        ?.filter((el) => el.roomId === roomId)
        .map((el, idx) => (
          <div className={`chatting ${el.sender === loginUser ? "login_user" : "other"}`} key={idx}>
            <p className="name">{el.senderName}</p>
            <p className={`message ${isDarkmode && "darkmode"}`}>{el.message}</p>
          </div>
        ))}
      <div ref={chattingRef}></div>
    </div>
  );
};

export default Chattings;
