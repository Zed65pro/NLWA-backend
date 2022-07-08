const express = require("express");
const router = express.Router();

const userModel = require("../models/user");

// status 500- server error
// status 404- not found
// status 400- user input error
// status 201- post success
// status 200- successful

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
router.post("/", async (req, res) => {
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
router.put("/:id", getUser, async (req, res) => {
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

// app.get("/users", async (req, res) => {
//   await userModel.find({}).then((err, result) => {
//     if (err) {
//       return res.send(err);
//     }
//     res.send(result);
//   });
// });

// app.get("/users/:id", async (req, res) => {
//   await userModel.findById(req.params.id).then((err, result) => {
//     if (err) {
//       return res.send(err);
//     }
//     res.send(result);
//   });
// });

// app.put("/users/:id", async (req, res) => {
//   await userModel
//     .findByIdAndUpdate(req.params.id, req.body)
//     .then((err, result) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send(result);
//       }
//     });
// });

// app.delete("/users/:id", async (req, res) => {
//   await userModel.findByIdAndRemove(req.params.id).exec();
//   res.send("Deleted user..");
// });

module.exports = router;
