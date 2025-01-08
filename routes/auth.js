const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  try {
    // Check if the email already exists
    let check = await User.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ success: false, errors: "Existing email" });
    }

    // Hash the password
    

    // Create a new user
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword, // Save the hashed password
    });

    // Save the user to the database
    await user.save();

    // Create a JWT token
    const data = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(data, process.env.JWT_SECRET || "encom_cod");

    // Respond with the token
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password.",
    });
  }

  // Ensure JWT_SECRET is defined
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      message: "Internal server error: Missing JWT secret.",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: _, ...userWithoutPassword } = user._doc;

    res.status(200).json({
      message: "Login successful",
      accessToken: token,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("Error during user login:", err);
    res.status(500).json({
      message: "Failed to login. Please try again later.",
      details: err.message,
    });
  }
});

module.exports = router;
