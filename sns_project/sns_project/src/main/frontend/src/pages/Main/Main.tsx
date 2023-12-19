import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Postmaker from "../../components/Postmaker/Postmaker";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Main.css";
import { RootState } from "../../redux";
import { useWebsocket } from "../../hook/useWebsocket";
import { useEffect } from "react";
import Chatroom from "../../components/Chat/Chatroom";
import PostList from "../../components/PostList/PostList";

const Main = () => {
  const { connectWebsocket } = useWebsocket();
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  useEffect(() => {
    connectWebsocket();
  }, []);
  return (
    <div className={`main_page ${isDarkmode && "darkmode"}`}>
      <Header />
      <div className="main_container">
        <Sidebar />
        <div className="main_content">
          <Postmaker />
          <div className={`friend_postList ${isDarkmode && "darkmode"}`}>
            <PostList />
          </div>
        </div>
        <Chatroom />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
