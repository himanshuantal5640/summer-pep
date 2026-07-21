import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CourseCard from "../../components/coursecard/Coursecard";
import "./MyCourses.css";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyCourses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please log in to view your enrolled courses.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/courses/my-courses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            navigate("/login");
            return;
          }
          throw new Error("Failed to fetch your enrolled courses");
        }

        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching enrolled courses:", err);
        setError(err.message || "Failed to load enrolled courses");
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, [navigate]);

  if (loading) {
    return (
      <div className="my-courses-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h2>Loading your enrolled courses...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-courses-container" style={{ textAlign: "center", color: "#ff4d4d" }}>
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="my-courses-container">
      <h1 className="my-courses-title">My Enrolled Courses</h1>

      {courses.length === 0 ? (
        <div className="empty-courses-state">
          <h3>No Enrolled Courses Yet</h3>
          <p>You haven't enrolled in any courses. Explore available courses on the Dashboard!</p>
          <Link to="/" className="browse-btn">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <CourseCard key={course.id || course._id} course={course} isEnrolled={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
