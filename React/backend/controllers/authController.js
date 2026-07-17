const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const signupUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        token: generateToken(user._id),
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter email and password" });
    }

    //  Find user by email
    const user = await User.findOne({ email });

    //  Check user and password
    if (user && (await user.matchPassword(password))) {
      res.json({
        token: generateToken(user._id),
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
