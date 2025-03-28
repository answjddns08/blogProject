const PostModel = require("../models/postModel");

class PostController {
  static async getPosts(req, res) {
    try {
      const search = req.query.search;
      const posts = await PostModel.getAllPosts(search);

      if (posts.length > 0) {
        res.json(posts);
      } else {
        res.status(404).json({ message: "No posts found" });
      }
    } catch (error) {
      res.status(500).json({ message: `Database error: ${error.message}` });
    }
  }

  static async getPost(req, res) {
    try {
      const post = await PostModel.getPostById(req.params.id);

      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    } catch (error) {
      res.status(500).json({ message: `Database error: ${error.message}` });
    }
  }
}

module.exports = PostController;
