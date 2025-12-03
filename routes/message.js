const express = require("express");
const Message = require("../models/messge")
const router = express.Router();


router.post("/", async(req, res) => {
    const message = await Message(req.body);
    try {
        const savedMessage = await message.save();
        res.status(200).json(savedMessage);
    }
    catch (e) {
             res.status(500).json(e);
    }
})
router.get("/:conversationId", async (req, res) => {
  try {
    const message = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(message);
  } catch (e) {
    res.status(500).json(e);
  }
});
module.exports = router;