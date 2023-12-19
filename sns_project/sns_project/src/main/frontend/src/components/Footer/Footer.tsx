import { useSelector } from "react-redux";
import "./Footer.css";
import { RootState } from "../../redux";

const Footer: React.FC = () => {
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  return <footer className={`footer ${isDarkmode && "darkmode"}`}>SNS_Project</footer>;
};

export default Footer;
