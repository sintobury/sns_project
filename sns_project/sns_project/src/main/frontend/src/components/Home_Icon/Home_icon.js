import { Link } from 'react-router-dom';
import './Home_icon.css';

const Homeicon = () => {
  return (
    <div>
      <Link to="/main" className="logo_container">
        <img id="logo" alt="logo"></img>
        <label htmlFor="logo">
          <h1>SNS_Project</h1>
        </label>
      </Link>
    </div>
  );
};

export default Homeicon;
