const express = require("express");
const router = express.Router();
const { addRatingToBook } = require("../controllers/bookController");

router.post("/:id", addRatingToBook);

module.exports = router;
