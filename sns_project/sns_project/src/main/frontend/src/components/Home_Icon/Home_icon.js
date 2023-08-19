import { Link } from 'react-router-dom';
import './Home_icon.css';

const Homeicon = () => {
  return (
    <div>
      <Link to="/main" className="logo_container">
        <img id="logo" alt="logo"></img>
        <label htmlFor="logo">SNS_Project</label>
      </Link>
    </div>
  );
};

export default Homeicon;
