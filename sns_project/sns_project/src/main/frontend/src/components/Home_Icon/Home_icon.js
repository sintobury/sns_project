import { Link } from 'react-router-dom';

const Homeicon = () => {
  return (
    <div>
      <Link to="/">
        <img id="logo" alt="logo"></img>
        <label htmlFor="logo">
          <h1>SNS_Project</h1>
        </label>
      </Link>
    </div>
  );
};

export default Homeicon;
