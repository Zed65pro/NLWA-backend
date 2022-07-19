/**@module routes/actions */

const express = require("express");
/**
 * Router
 * @typedef {Router} router
 */
const router = express.Router();

/**@typedef {mongoose.Model} */
const actionModel = require("../models/action");

/**
 * will check if validation has an error
 * @typedef {Function} validate - middleware
 */
const { validate } = require("../middlewares/validate");
/**
 * Validation of action body - will act as middleware
 * @typedef {Function} validateAction - middleware
 */
const { validateAction } = require("../middlewares/actionValidation");

/**
 * Middleware function which gets an action based on it's id
 * @param {Request} req -Request
 * @param {Response} res -Response
 * @param {Function} next -next()
 * @returns {Response}
 */
const getAction = async (req, res, next) => {
  let action;

  try {
    action = await actionModel.findById(req.params.id);
    if (!action) return res.status(404).json({ message: "action not found." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.action = action;
  next();
};

/**
 * Route serving getting all actions
 * @name get/
 * @function
 * @memberof module:routes/actions
 * @inner
 * @param {string} path - Express path
 * @param {callback} callback - Express callback
 */
router.get("/", async (req, res) => {
  try {
    const actions = await actionModel.find();
    res.json(actions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Route serving posting an action
 * @name post/
 * @function
 * @memberof module:routes/actions
 * @inner
 * @param {string} path - Express path
 * @param {callback} validateAction - Express middleware, for validation
 * @param {callback} validate - Express middleware, for validation
 * @param {callback} callback - Express callback
 */
router.post("/", validateAction, validate, async (req, res) => {
  const action = new actionModel({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const newAction = await action.save();
    res.status(201).json(newAction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * Route serving getting an action by id
 * @name get/:id
 * @function
 * @memberof module:routes/actions
 * @inner
 * @param {string} path - Express path
 * @param {callback} getAction - Express middleware
 * @param {callback} callback - Express callback
 */
router.get("/:id", getAction, (req, res) => {
  res.json(res.action);
});

/**
 * Route serving updating an action
 * @name put/:id
 * @function
 * @memberof module:routes/actions
 * @inner
 * @param {string} path - Express path
 * @param {callback} validateAction - Express middleware, for validation
 * @param {callback} validate - Express middleware, for validation
 * @param {callback} getAction - Express middleware
 * @param {callback} callback - Express callback
 */
router.put("/:id", validateAction, validate, getAction, async (req, res) => {
  res.action.title = req.body.title;
  res.action.content = req.body.content;

  try {
    const updatedAction = await res.action.save();
    res.json(updatedAction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * Route serving updating an action
 * @name delete/:id
 * @function
 * @memberof module:routes/actions
 * @inner
 * @param {string} path - Express path
 * @param {callback} getAction - Express middleware
 * @param {callback} callback - Express callback
 */
router.delete("/:id", getAction, async (req, res) => {
  try {
    await res.action.remove();
    res.send("Deleted action.");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
