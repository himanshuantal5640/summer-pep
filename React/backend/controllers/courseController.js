const Course = require("../models/Course");
const User = require("../models/User");
const initialCourses = require("../data/courses");

// @desc    Get all courses (seeds database if empty)
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    let courses = [];
    try {
      courses = await Course.find({}).sort({ id: 1 });

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
      return res.json(initialCourses);
    }

    res.json(courses);
  } catch (error) {
    console.error("Unexpected error in getCourses:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private
const createCourse = async (req, res) => {
  const { title, instructor, price, duration, level, image } = req.body;

  if (!title || !instructor || !price || !duration || !level) {
    return res.status(400).json({ message: "Please provide all required course fields" });
  }

  try {
    const lastCourse = await Course.findOne({}).sort({ id: -1 });
    const nextId = (lastCourse?.id || 0) + 1;

    const course = await Course.create({
      id: nextId,
      title,
      instructor,
      price: Number(price),
      duration,
      level,
      image: image || `https://picsum.photos/300/200?${nextId}`,
    });

    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    console.error("Create course error:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:courseId
// @access  Private
const deleteCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    let course = await Course.findById(courseId);

    if (!course && courseId && !Number.isNaN(Number(courseId))) {
      course = await Course.findOne({ id: Number(courseId) });
    }

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await Course.findByIdAndDelete(course._id);
    await User.updateMany({}, { $pull: { enrolledCourses: course._id } });

    res.json({ message: "Course deleted successfully", course });
  } catch (error) {
    console.error("Delete course error:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

// @desc    Enroll in a course
// @route   POST /api/courses/enroll/:courseId
// @access  Private
const enrollCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
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
  createCourse,
  deleteCourse,
  enrollCourse,
  getMyCourses,
};
