import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Postmaker from '../../components/Postmaker/Postmaker';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Main.css';

const Main = () => {
  return (
    <div className="main_page">
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
