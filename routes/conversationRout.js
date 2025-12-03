const express = require("express");
const Conversation = require("../models/conversation");

const router = express.Router();
const { createConversation } = require("../controllers/coversation")

router.post("/", createConversation);

router.get("/:userId", async (req, res) => {
     
    try {
         const conversation = await Conversation.find({
           members: { $in: [req.params.userId] },
         }); 
        res.status(200).json(conversation);
    } 
    catch (e) {
        res.status(500).json(e);
    }
})
 
module.exports = router;