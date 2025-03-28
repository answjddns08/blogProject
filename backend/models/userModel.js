const db = require("../config/database");

class UserModel {
  static async login(uid, upw) {
    const connection = await db.getConnection();
    try {
      const [rows] = await connection.execute(
        "SELECT * FROM user_table WHERE uid = ? AND upw = ?",
        [uid, upw]
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async getUserById(uid) {
    const connection = await db.getConnection();
    try {
      const [rows] = await connection.execute("SELECT * FROM user_table WHERE uid = ?", [uid]);
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async createUser(uid, upw, name) {
    const connection = await db.getConnection();
    try {
      await connection.execute("INSERT INTO user_table (uid, upw, name) VALUES (?, ?, ?)", [
        uid,
        upw,
        name,
      ]);
      return true;
    } finally {
      connection.release();
    }
  }
}

module.exports = UserModel;
