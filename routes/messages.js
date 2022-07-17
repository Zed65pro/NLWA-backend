const express = require("express");
const router = express.Router();
const messageModel = require("../models/message");

// Validation middlware
const { validate } = require("../middlewares/validate");
const { validateMessage } = require("../middlewares/messageValidation");

// Middleware
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

//GET ALL
router.get("/", async (req, res) => {
  try {
    const message = await messageModel.find();
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST
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

// GET - BY ID
router.get("/:id", getMessage, (req, res) => {
  res.json(res.message);
});

// DELETE
router.delete("/:id", getMessage, async (req, res) => {
  try {
    await res.message.remove();
    res.send("Deleted message.");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
