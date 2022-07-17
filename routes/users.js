const express = require("express");
const router = express.Router();

const userModel = require("../models/user");

// status 500- server error
// status 404- not found
// status 400- user input error
// status 201- post success
// status 200- successful

//Validation middlware
const { validate } = require("../middlewares/validate");
const { validateUser } = require("../middlewares/userValidation");

// MIDDLEWARE for getting user
const getUser = async (req, res, next) => {
  let user;

  try {
    user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
};

//GET ALL
router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST
router.post("/", validateUser, validate, async (req, res) => {
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
});

// GET - BY ID
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

// PUT
router.put("/:id", validateUser, validate, getUser, async (req, res) => {
  res.user.username = req.body.username;
  res.user.password = req.body.password;
  res.user.email = req.body.email;

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.send("Deleted user.");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
