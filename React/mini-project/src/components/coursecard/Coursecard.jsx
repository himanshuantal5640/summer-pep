import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Coursecard.css";

const CourseCard = ({ course, isEnrolled: initialIsEnrolled = false }) => {
  const [enrolled, setEnrolled] = useState(initialIsEnrolled);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEnroll = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to enroll in courses!");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const courseId = course._id || course.id;
      const response = await fetch(`http://localhost:5000/api/courses/enroll/${courseId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert("Enrolled Successfully! Check your 'My Courses' page.");
        setEnrolled(true);
      } else {
        alert(data.message || "Enrollment failed");
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      alert("Something went wrong during enrollment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          <span>Duration: {course.duration}</span>
          <span>Level: {course.level}</span>
        </div>

        <div className="course-footer">
          <h4>Price: ₹{course.price}</h4>
          {enrolled ? (
            <button className="enrolled-btn" disabled style={{ backgroundColor: "#10b981", color: "white", cursor: "default" }}>
              Enrolled ✓
            </button>
          ) : (
            <button onClick={handleEnroll} disabled={loading}>
              {loading ? "Enrolling..." : "Enroll Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;