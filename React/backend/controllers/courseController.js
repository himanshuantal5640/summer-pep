const Course = require("../models/Course");
const initialCourses = require("../data/courses");

const getCourses = async (req, res) => {
  try {
    let courses = await Course.find({}).sort({ id: 1 });

    // If database is empty, seed it with initial courses
    if (courses.length === 0) {
      console.log("Seeding courses database with default courses...");
      await Course.insertMany(initialCourses);
      courses = await Course.find({}).sort({ id: 1 });
    }

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

module.exports = {
  getCourses,
};
