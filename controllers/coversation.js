const Conversation = require("../models/conversation");

const createConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId], // Corrected `req.receverId` to `req.body.receiverId`
  });
  try {
    const saveconversation = await newConversation.save();
    res.status(200).json(saveconversation); // Corrected `saveconversation` to `savedConversation`
  } catch (err) {
    res.status(500).json(err); // Corrected `staus` to `status`
  }
};
 
 

module.exports = {
  createConversation,
};
