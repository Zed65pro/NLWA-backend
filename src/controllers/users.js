/**@module controllers/users */

/**@typedef {mongoose.Model}*/
const userModel = require("../models/user");

module.exports = {
  /**
   * Controller function for getting all users
   * @param {Request} req -Request
   * @param {Response} res -Response
   * @returns {Response}
   */
  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  /**
   * Controller function for getting a user by Id
   * @param {Request} req -Request
   * @param {Response} res -Response
   * @returns {Response}
   */
  getUserById: (req, res) => {
    res.json(res.user);
  },
  /**
   * Controller function for posting a user
   * @param {Request} req Request
   * @param {Response} res Response
   * @returns {Response}
   */
  postUser: async (req, res) => {
    const user = new userModel({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });

    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  /**
   * Middleware function which gets a user based on it's id
   * @param {Request} req -Request
   * @param {Response} res -Response
   * @param {Function} next -next()
   * @returns {Response}
   */
  getUser: async (req, res, next) => {
    let user;

    try {
      user = await userModel.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found." });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
  },
  /**
   * Controller function for updating a user
   * @param {Request} req Request
   * @param {Response} res Response
   * @returns {Response}
   */
  updateUser: async (req, res) => {
    res.user.username = req.body.username;
    res.user.password = req.body.password;
    res.user.email = req.body.email;

    try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  /**
   * Controller function for deleting a user
   * @param {Request} req Request
   * @param {Response} res Response
   * @returns {Response}
   */
  deleteUser: async (req, res) => {
    try {
      await res.user.remove();
      res.send("Deleted user.");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
