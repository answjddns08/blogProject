const UserModel = require("../models/userModel");

class UserController {
  static async login(req, res) {
    try {
      const { id, password } = req.body;
      const user = await UserModel.login(id, password);

      if (user) {
        res.json(user);
      } else {
        res.status(401).json({ error: "User not found or Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: `Database error: ${error.message}` });
    }
  }

  static async getUser(req, res) {
    try {
      const user = await UserModel.getUserById(req.params.id);

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: `Database error: ${error.message}` });
    }
  }

  static async signUp(req, res) {
    try {
      const { id, password, name } = req.body;
      await UserModel.createUser(id, password, name);
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ message: `Database error: ${error.message}` });
    }
  }
}

module.exports = UserController;
