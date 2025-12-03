const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: String,
  description: String,
  rating: Number,
  averageRating: Number,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
