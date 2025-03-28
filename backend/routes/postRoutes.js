const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postController");

router.get("/", PostController.getPosts);
router.get("/:id", PostController.getPost);

module.exports = router;
