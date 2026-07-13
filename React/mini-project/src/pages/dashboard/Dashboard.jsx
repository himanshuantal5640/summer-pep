import React from "react";
import courses from "../../data/courses";
import "./Dashboard.css";
import CourseCard from "../../components/coursecard/Coursecard";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Available Courses</h1>

      <div className="courses-grid">
        {courses.map((course) => (
            <CourseCard key={course.id} course={course}/>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;