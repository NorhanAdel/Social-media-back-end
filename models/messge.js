const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true } // Corrected `timestamp` to `timestamps`
);

const Message = mongoose.model("Message", messageSchema); // Renamed `Conversation` to `Message`

module.exports = Message;
