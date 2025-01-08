const express = require("express");
const Post = require("../models/post");
const router = express.Router();
const User = require("../models/user");

router.post('/:id', async(req,res) => {
    const newPost = await Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err)
    }
})


router.put("/:id", async (req, res) => {
    
    try {
         const post = Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("your post updated")
        } else {
          res.status(403).json("you can only update your post");
        } 
    } catch (err) {
         res.status(500).json(err);
    }
    
})

router.put("/:id", async (req, res) => {
  try {
    const post = Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("your post deleted");
    } else {
      res.status(403).json("you can only deleted your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id/like", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("the post has been liked")
        }
        else {
           await post.updateOne({ $push: { likes: req.body.userId } });
           res.status(200).json("the post has been disliked"); 
        }
    }
    catch (err) {
       res.status(500).json(err);  
    }
})


router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch (err) {
         res.status(500).json(err);
     }
})

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.flowings.map(async (friendId) => {
        return await Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

// user all posts 

router.get("/profile/:username", async (req, res) => {
  try {
    const user = User.findOne({ username: req.params.username });
    const posts = Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;