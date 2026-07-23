import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import CourseCard from "../../components/coursecard/Coursecard";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    price: "",
    duration: "",
    level: "Beginner",
    image: "",
  });

  const isLoggedIn = Boolean(localStorage.getItem("token"));

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

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setActionMessage("Please log in to add a course.");
      return;
    }

    setAdding(true);
    setActionMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to add course");
      }

      setActionMessage("Course added successfully.");
      setFormData({
        title: "",
        instructor: "",
        price: "",
        duration: "",
        level: "Beginner",
        image: "",
      });
      await fetchCourses();
    } catch (err) {
      setActionMessage(err.message || "Unable to add course");
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setActionMessage("Please log in to delete a course.");
      return;
    }

    const confirmDelete = window.confirm("Delete this course?");
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/courses/${courseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete course");
      }

      setActionMessage("Course deleted successfully.");
      await fetchCourses();
    } catch (err) {
      setActionMessage(err.message || "Unable to delete course");
    }
  };

  if (loading) {
    return (
      <div
        className="dashboard"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <h2>Loading courses...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="dashboard"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          color: "#ff4d4d",
        }}
      >
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Available Courses</h1>

      {isLoggedIn && (
        <form className="add-course-form" onSubmit={handleAddCourse}>
          <h2>Add a New Course</h2>
          <div className="form-row">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Course title"
              required
            />
            <input
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              placeholder="Instructor"
              required
            />
          </div>
          <div className="form-row">
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
            />
            <input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration"
              required
            />
          </div>
          <div className="form-row">
            <select name="level" value={formData.level} onChange={handleChange}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL (optional)"
            />
          </div>
          <button type="submit" disabled={adding}>
            {adding ? "Adding..." : "Add Course"}
          </button>
        </form>
      )}

      {actionMessage && <p className="action-message">{actionMessage}</p>}

      <div className="courses-grid">
        {courses.map((course) => (
          <CourseCard
            key={course.id || course._id}
            course={course}
            canDelete={isLoggedIn}
            onDelete={handleDeleteCourse}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
