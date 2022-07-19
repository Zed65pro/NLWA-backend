/**@module routes/messages */


const express = require("express");
/**
 * Router
 * @typedef {Router} router
 */
const router = express.Router();
/**@typedef {mongoose.Model}*/
const messageModel = require("../models/message");

/**
 * will check if validation has an error
 * @typedef {Function} validate - middleware
 */
const { validate } = require("../middlewares/validate");
/**
 * Validation of messages body - will act as middleware
 * @typedef {Function} validateAction - middleware
 */
const { validateMessage } = require("../middlewares/messageValidation");

/**
 * Middleware function which gets a message based on it's id
 * @param {Request} req -Request
 * @param {Response} res -Response
 * @param {Function} next -next()
 * @returns {Response}
 */
const getMessage = async (req, res, next) => {
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
};

/**
 * Route , getting all messages
 * @name get/
 * @function
 * @memberof module:routes/messages
 * @inner
 * @param {string} path - Express path
 * @param {callback} callback - Express callback
 */
router.get("/", async (req, res) => {
  try {
    const message = await messageModel.find();
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Route , posting a message
 * @name post/
 * @function
 * @memberof module:routes/messages
 * @inner
 * @param {string} path - Express path
 * @param {callback} validateMessage - Express middleware, validation
 * @param {callback} validate - Express middleware , validation
 * @param {callback} callback - Express callback
 */
router.post("/", validateMessage, validate, async (req, res) => {
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
});

/**
 * Route , getting a message based on id
 * @name get/:id
 * @function
 * @memberof module:routes/messages
 * @inner
 * @param {string} path - Express path
 * @param {callback} getMessage - Express middleware 
 * @param {callback} callback - Express callback
 */
router.get("/:id", getMessage, (req, res) => {
  res.json(res.message);
});

/**
 * Route , deleting a message
 * @name delete/:id
 * @function
 * @memberof module:routes/messages
 * @inner
 * @param {string} path - Express path
 * @param {callback} getMessage - Express middleware 
 * @param {callback} callback - Express callback
 */
router.delete("/:id", getMessage, async (req, res) => {
  try {
    await res.message.remove();
    res.send("Deleted message.");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
