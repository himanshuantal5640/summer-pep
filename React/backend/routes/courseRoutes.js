const express = require("express");
const router = express.Router();
const {
  getCourses,
  enrollCourse,
  getMyCourses,
} = require("../controllers/courseController");
const { protect } = require("../middleware/authMiddleware");

// Route to get all courses (Public)
router.get("/", getCourses);

// Route to get enrolled courses for logged in student (Protected)
router.get("/my-courses", protect, getMyCourses);

// Route to enroll in a course (Protected)
router.post("/enroll/:courseId", protect, enrollCourse);

module.exports = router;
