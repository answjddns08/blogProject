const db = require("../config/database");

class PostModel {
  static async getAllPosts(search = "") {
    const connection = await db.getConnection();
    try {
      if (search) {
        const [rows] = await connection.execute(
          "SELECT * FROM post_table WHERE title LIKE ? OR content LIKE ?",
          [`%${search}%`, `%${search}%`]
        );
        return rows;
      } else {
        const [rows] = await connection.execute("SELECT * FROM post_table");
        return rows;
      }
    } finally {
      connection.release();
    }
  }

  static async getPostById(id) {
    const connection = await db.getConnection();
    try {
      const [rows] = await connection.execute("SELECT * FROM post_table WHERE id = ?", [id]);
      return rows[0];
    } finally {
      connection.release();
    }
  }
}

module.exports = PostModel;
