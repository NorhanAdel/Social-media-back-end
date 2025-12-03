const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("author");
    res.json({ posts });
  }catch(error) {
    res.status(500).json({ message: error });
  }
}
exports.createPost = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    const imagePath = req.file?.path || "";
    const post = new Post({
      title,
      content,
      author: authorId,
      image: imagePath,
      status:"pending"
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { content, authorId } = req.body;
    const postId = req.params.postId;
    const comment = new Comment({
      content,
      author: authorId,
    });
    await comment.save();

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push(comment._id);
    await post.save();

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.acceptpost = async (req, res) => {
  const postid = req.params.postid;
  const post = await Post.findById(postid);
  post.status = "accepted";
  await post.save();
  res.status(200).json({ message: "Post Accepted",post });
};
exports.rejectpost = async (req, res) => {
  const postid = req.params.postid;
  const post = await Post.findById(postid);
  post.status = "rejected";
  await post.save();
  res.status(200).json({ message: "Post rejected" });
};
