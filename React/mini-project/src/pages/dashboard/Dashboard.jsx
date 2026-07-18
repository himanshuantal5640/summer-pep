import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import CourseCard from "../../components/coursecard/Coursecard";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses data");
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err.message || "Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="dashboard" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <h2>Loading courses...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", color: "#ff4d4d" }}>
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Available Courses</h1>

      <div className="courses-grid">
        {courses.map((course) => (
          <CourseCard key={course.id || course._id} course={course}/>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;