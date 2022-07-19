/**@module routes/users */

const express = require("express");
/**
 * Router
 * @typedef {Router} router
 */
const router = express.Router();
/**@typedef {mongoose.Model}*/
const userModel = require("../models/user");

// status 500- server error
// status 404- not found
// status 400- user input error
// status 201- post success
// status 200- successful

/**
 * will check if validation has an error
 * @typedef {Function} validate - middleware
 */
const { validate } = require("../middlewares/validate");
/**
 * Validation of user's body - will act as middleware
 * @typedef {Function} validateAction - middleware
 */
const { validateUser } = require("../middlewares/userValidation");

/**
 * Middleware function which gets a user based on it's id
 * @param {Request} req -Request
 * @param {Response} res -Response
 * @param {Function} next -next()
 * @returns {Response}
 */
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

/**
 * Route , getting all users
 * @name get/
 * @function
 * @memberof module:routes/users
 * @inner
 * @param {string} path - Express path
 * @param {callback} callback - Express callback
 */
router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Route , posting a user
 * @name post/
 * @function
 * @memberof module:routes/users
 * @inner
 * @param {string} path - Express path
 * @param {callback} validateUser - Express middleware, validation
 * @param {callback} validate - Express middleware , validation
 * @param {callback} callback - Express callback
 */
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

/**
 * Route , getting a user based on id
 * @name get/:id
 * @function
 * @memberof module:routes/users
 * @inner
 * @param {string} path - Express path
 * @param {callback} getUser - Express middleware 
 * @param {callback} callback - Express callback
 */
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

/**
 * Route , updating a user
 * @name put/:id
 * @function
 * @memberof module:routes/users
 * @inner
 * @param {string} path - Express path
 * @param {callback} validateUser - Express middleware, validation
 * @param {callback} validate - Express middleware , validation
 * @param {callback} getUser - Express middleware 
 * @param {callback} callback - Express callback
 */
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

/**
 * Route , deleting a server
 * @name delete/:id
 * @function
 * @memberof module:routes/users
 * @inner
 * @param {string} path - Express path
 * @param {callback} getUser - Express middleware 
 * @param {callback} callback - Express callback
 */
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.send("Deleted user.");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
