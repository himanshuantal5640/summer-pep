const Course = require("../models/Course");
const User = require("../models/User");
const initialCourses = require("../data/courses");

// @desc    Get all courses (seeds database if empty)
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  // Try to read from the database, but fall back to the in-memory seed data
  try {
    let courses = [];
    try {
      courses = await Course.find({}).sort({ id: 1 });

      // If database is empty, seed it with initial courses
      if (courses.length === 0) {
        console.log("Seeding courses database with default courses...");
        await Course.insertMany(initialCourses);
        courses = await Course.find({}).sort({ id: 1 });
      }
    } catch (dbErr) {
      console.warn(
        "Database not available, returning fallback initial courses.",
        dbErr.message,
      );
      // Provide fallback to the static initial courses so the frontend still works
      return res.json(initialCourses);
    }

    res.json(courses);
  } catch (error) {
    console.error("Unexpected error in getCourses:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

// @desc    Enroll in a course
// @route   POST /api/courses/enroll/:courseId
// @access  Private
const enrollCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    // Find course by custom numeric id or Mongoose _id
    let course;
    if (courseId.match(/^[0-9a-fA-F]{24}$/)) {
      course = await Course.findById(courseId);
    } else {
      course = await Course.findOne({ id: Number(courseId) });
    }

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already enrolled
    const isEnrolled = user.enrolledCourses.some(
      (id) => id.toString() === course._id.toString(),
    );

    if (isEnrolled) {
      return res
        .status(400)
        .json({ message: "You are already enrolled in this course" });
    }

    user.enrolledCourses.push(course._id);
    await user.save();

    res.json({
      message: "Successfully enrolled in course!",
      course,
    });
  } catch (error) {
    console.error("Enrollment error:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

// @desc    Get enrolled courses for logged-in student
// @route   GET /api/courses/my-courses
// @access  Private
const getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("enrolledCourses");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.enrolledCourses || []);
  } catch (error) {
    console.error("Fetch enrolled courses error:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

module.exports = {
  getCourses,
  enrollCourse,
  getMyCourses,
};
