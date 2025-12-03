const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const validator = require("email-validator");

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const isValid = validator.validate(email);
    if (!isValid) {
      return res.status(409).json({
        message:
          "The provided email address is not valid. Please enter a valid email address.",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message:
          "The email address is already in use. Please use a different email address.",
      });
    }
    if (!password) {
      return res.status(409).json({
        message:
          "The provided password is not valid or empty. Please enter a valid password.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      accessToken: token,
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      accessToken: token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, newPassword } = req.body;
    console.log(req.body, req.user);
    const user = await User.findById(req.user.id);

    if (username) {
      user.username = username;
    }

    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
const addToShelves = async (req, res) => {
  try {
    const userID = req.user.id;
    const data = req.body;
    const user = await User.findByIdAndUpdate(
      userID,
      { $push: { shelves: { ...data } } },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "book added successfully to shelves", user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
module.exports = {
  registerUser,
  loginUser,
  updateUser,
  addToShelves,
};
