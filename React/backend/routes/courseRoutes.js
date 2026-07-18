const express = require("express");
const router = express.Router();
const { getCourses } = require("../controllers/courseController");

// Route to get all courses
router.get("/", getCourses);

module.exports = router;
