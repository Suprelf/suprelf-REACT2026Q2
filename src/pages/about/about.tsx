import { Link } from 'react-router-dom';
import './about.css';

const About = () => {
  return (
    <div className="page">
      <h1>About this app</h1>

      <p>
        Author:
        <span>
          <a href="https://github.com/Suprelf">Github</a>
        </span>
      </p>

      <a href="https://app.rs.school/course/student/dashboard?course=react-2026-q2">
        React Course
      </a>

      <Link to="/">Go Home</Link>
    </div>
  );
};

export default About;
