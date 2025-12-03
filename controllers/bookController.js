const addRatingToBook = async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  try {
    const book = await book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.rating = rating;
    book.averageRating = calculateAverageRating(
      book.rating,
      book.averageRating,
      book.ratings.length
    );

    await book.save();

    res.status(200).json({ message: "Rating added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const calculateAverageRating = (newRating, currentAverage, numberOfRatings) => {
  const totalRating = currentAverage * numberOfRatings;
  return (totalRating + newRating) / (numberOfRatings + 1);
};

module.exports = { addRatingToBook };
