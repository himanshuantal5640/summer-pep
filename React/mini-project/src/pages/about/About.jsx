import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1>About CourseHub</h1>

        <p>
          Welcome to <strong>CourseHub</strong>, your one-stop platform for
          learning modern technologies and enhancing your development skills.
        </p>

        <p>
          We provide high-quality courses in Web Development, MERN Stack,
          React.js, Node.js, MongoDB, Cloud Computing, Data Structures &
          Algorithms, and many more.
        </p>

        <p>
          Our mission is to make learning simple, affordable, and accessible
          for students and professionals worldwide.
        </p>

        <div className="features">
          <div className="feature-box">
            <h3>Quality Courses</h3>
            <p>Learn from industry experts and experienced instructors.</p>
          </div>

          <div className="feature-box">
            <h3>Practical Learning</h3>
            <p>Hands-on projects and real-world applications.</p>
          </div>

          <div className="feature-box">
            <h3>Career Growth</h3>
            <p>Build skills that help you get internships and jobs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;