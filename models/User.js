const mongoose = require("mongoose");
// @note for all -> basic user schema it will update later - for now just to test front end part
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },

    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    shelves: [],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
