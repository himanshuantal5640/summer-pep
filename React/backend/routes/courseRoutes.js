const express = require("express");
const router = express.Router();
const {
  getCourses,
  createCourse,
  deleteCourse,
  enrollCourse,
  getMyCourses,
} = require("../controllers/courseController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getCourses);

router.post("/", protect, createCourse);

router.delete("/:courseId", protect, deleteCourse);

router.get("/my-courses", protect, getMyCourses);

router.post("/enroll/:courseId", protect, enrollCourse);

module.exports = router;
