/**@module controllers/messages */

/**@typedef {mongoose.Model}*/
const messageModel = require("../models/message");

module.exports = {
  /**
   * Middleware function which gets a message based on it's id
   * @param {Request} req -Request
   * @param {Response} res -Response
   * @param {Function} next -next()
   * @returns {Response}
   */
  getMessage: async (req, res, next) => {
    let message;

    try {
      message = await messageModel.findById(req.params.id);
      if (!message)
        return res.status(404).json({ message: "Message not found." });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

    res.message = message;
    next();
  },
  /**
   * Controller function to get all messages
   * @param {Request} req -Request
   * @param {Response} res -Response
   * @returns {Response}
   */
  getAllMessages: async (req, res) => {
    try {
      const message = await messageModel.find();
      res.json(message);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  /**
   * Controller function to create a message
   * @param {Request} req -Request
   * @param {Response} res -Response
   * @returns {Response}
   */
  postMessage: async (req, res) => {
    const message = new messageModel({
      title: req.body.title,
      body: req.body.body,
      dateCreatedAt: req.body.dateCreatedAt,
    });

    try {
      const newMessage = await message.save();
      res.status(201).json(newMessage);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  /**
   * Controller function to get a message by id
   * @param {Request} req -Request
   * @param {Response} res -Response
   * @returns {Response}
   */
  getMessageById: (req, res) => {
    res.json(res.message);
  },
  /**
   * Controller function to delete a message
   * @param {Request} req -Request
   * @param {Response} res -Response
   * @returns {Response}
   */
  deleteMessage: async (req, res) => {
    try {
      await res.message.remove();
      res.send("Deleted message.");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
