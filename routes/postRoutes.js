const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");



router.get("/", postController.getPosts);
router.post("/", postController.createPost);
router.post("/:postId/comment", postController.createComment);

router.post("/accept/:postId", postController.acceptpost);
router.post("/reject/:postId", postController.rejectpost);


module.exports = router;
