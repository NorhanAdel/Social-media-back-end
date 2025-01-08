const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");


  //update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can update only your account");
  }
});


//delete user

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
   
    try {
        const user = await User.deleteOne({_id: req.params.id });
      res.status(200).json("account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can delete only your account");
  }
});


//get user 
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId) // Use userId from req.query
      : await User.findOne({ username: username }); // Use username from req.query

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, updateAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.put("/:id/follow", async(req,res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
              const current = await User.findById(req.body.userId);
            
            if (user.flowers.includes(req.body.userId)) {
                await user.updateOne({ $push: { flowings: req.body.userId } });
                res.status(200).json("user has been fllowed")
            } else {
                res.status(403).json("you allready fllow this account")
}
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you can't follow your selfe")
    }
})

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const current = await User.findById(req.body.userId);

      if (user.flowers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { flowers: req.params.id } });
        res.status(200).json("user has been unfllowed");
      } else {
        res.status(403).json("you allready unfllow this account");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can't unfollow your selfe");
  }
});





module.exports = router;
