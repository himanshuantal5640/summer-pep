import React from "react";
import "./Coursecard.css";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img
        src={course.image}
        alt={course.title}
        className="course-image"
      />

      <div className="course-content">
        <h3>{course.title}</h3>

        <p className="instructor">
          <strong>Instructor:</strong> {course.instructor}
        </p>

        <div className="course-details">
          <span>{course.duration}</span>
          <span>{course.level}</span>
        </div>

        <div className="course-footer">
          <h4>{course.price}</h4>
          <button>Enroll Now</button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;