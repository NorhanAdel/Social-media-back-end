const express = require('express');
const router = express.Router();
const {
  rejectUser,
  acceptUser,
  getUser,
  rejectpost,
  acceptpost,
  pendingposts,
} = require("../controllers/adminController");
 
router.post("/acceptuser", acceptUser);
router.post("/rejectuser", rejectUser);
router.get("/allUser", getUser);
router.post("/rejectpost", rejectpost);
router.post("/acceptpost", acceptpost);
router.get("/pendingposts", pendingposts);
module.exports = router;