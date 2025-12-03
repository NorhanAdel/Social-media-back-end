const User = require("../models/User");
const mongoose= require("mongoose")
const acceptUser = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.accepted = true;
    await user.save();

    res.status(200).json({ message: "User accepted" });
  } catch (err) {
    console.error("Error accepting user:", err);
    res.status(500).json({ error: "Error accepting user" });
  }
};

const getUser = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users" });
  }
};

const rejectUser = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.error("Missing userId in request body");
    return res.status(400).json({ error: "UserId is required" });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.error(`Invalid userId format: ${userId}`);
    return res.status(400).json({ error: "Invalid userId format" });
  }

  console.log(`Received userId: ${userId}`);

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.warn(`User not found with id: ${userId}`);
      return res.status(404).json({ error: "User not found" });
    }

    console.log(`User found: ${user._id}`);
    await User.deleteOne({ _id: userId });
    console.log(`User removed: ${user._id}`);
    res.status(200).json({ message: "User rejected and removed" });
  } catch (err) {
    console.error("Error rejecting user:", err);
    res.status(500).json({ error: "Error rejecting user" });
  }
};

module.exports = { rejectUser };


const admin = require("../models/admin");
const Post = require("../models/Post");
const pendingposts = async (req, res) => {
  try {
    const pinnedPosts = await Post.find({ status: "pending" });
    res.status(201).json(pinnedPosts);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};
const acceptpost = async (req, res) => {
  const postid = req.params.postid;
  try {
    const post = await Post.findById(postid);
    if (post) {
      post.status = "accepted";
      await post.save();
      res.status(200).json({ message: "Post Accepted" });
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};
const rejectpost = async (req, res) => {
  const postid = req.params.postid;
  try {
    const post = await Post.findById(postid);
    if (post) {
      post.status = "rejected";
      await post.save();
      res.status(200).json({ message: "Post rejected" });
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};


module.exports = {
  rejectUser,
  acceptUser,
  getUser,
  rejectpost,
  acceptpost,
  pendingposts,
};
