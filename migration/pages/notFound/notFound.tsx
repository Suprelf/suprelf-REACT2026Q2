import './notFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page">
      <h1>404</h1>

      <p>Page not found</p>

      <p>The page you are looking for does not exist.</p>

      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NotFound;
