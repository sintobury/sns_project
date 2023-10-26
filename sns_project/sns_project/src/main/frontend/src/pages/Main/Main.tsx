import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Postmaker from "../../components/Postmaker/Postmaker";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Main.css";
import { RootState } from "../../redux";
import { useWebsocket } from "../../hook/useWebsocket";
import { useEffect } from "react";

const Main = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  const { connectWebsocket } = useWebsocket();
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
