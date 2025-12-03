const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true } // Corrected to `timestamps`
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
