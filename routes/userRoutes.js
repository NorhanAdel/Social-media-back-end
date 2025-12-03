const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  addToShelves,
} = require("../controllers/userController");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.patch("/shelves/", authenticateUser, addToShelves);

router.put("/profile", authenticateUser, updateUser);
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
