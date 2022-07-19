/**@module routes/backgrounds */

const express = require("express");
/**
 * Router
 * @typedef {Router}
 */
const router = express.Router();

/**@typedef {mongoose.Model}*/
const backgroundModel = require("../models/background");

/**
 * will check if validation has an error
 * @typedef {Function} validate - middleware
 */
const { validate } = require("../middlewares/validate");
/**
 * Validation of background body - will act as middleware
 * @typedef {Function} validateBackground - middleware
 */
const { validateBackground } = require("../middlewares/backgroundValidation");

/**
 * Middleware function which gets an background based on it's id
 * @param {Request} req -Request
 * @param {Response} res -Response
 * @param {Function} next -next()
 * @returns {Response}
 */
const getBackground = async (req, res, next) => {
  let background;

  try {
    background = await backgroundModel.findById(req.params.id);
    if (!background)
      return res.status(404).json({ message: "background not found." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.background = background;
  next();
};

/**
 * Route serving getting all backgrounds
 * @name get/
 * @function
 * @memberof module:routes/backgrounds
 * @inner
 * @param {string} path - Express path
 * @param {callback} callback - Express callback
 */
router.get("/", async (req, res) => {
  try {
    const backgrounds = await backgroundModel.find();
    res.json(backgrounds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Route serving posting a background
 * @name post/
 * @function
 * @memberof module:routes/backgrounds
 * @inner
 * @param {string} path - Express path
 * @param {callback} validateBackground - Express middleware , validation
 * @param {callback} validate - Express middleware ,validation
 * @param {callback} callback - Express callback
 */
router.post("/", validateBackground, validate, async (req, res) => {
  const background = new backgroundModel({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const newBackground = await background.save();
    res.status(201).json(newBackground);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * Route , getting a background by id
 * @name get/:id
 * @function
 * @memberof module:routes/backgrounds
 * @inner
 * @param {string} path - Express path
 * @param {callback} getBackground - Express middleware
 * @param {callback} callback - Express callback
 */
router.get("/:id", getBackground, (req, res) => {
  res.json(res.background);
});

/**
 * Route , updating a background
 * @name put/:id
 * @function
 * @memberof module:routes/backgrounds
 * @inner
 * @param {string} path - Express path
 * @param {callback} validateBackground - Express middleware
 * @param {callback} validate - Express middleware
 * @param {callback} getBackground - Express middleware
 * @param {callback} callback - Express callback
 */
router.put(
  "/:id",
  validateBackground,
  validate,
  getBackground,
  async (req, res) => {
    res.background.title = req.body.title;
    res.background.content = req.body.content;

    try {
      const updatedBackground = await res.background.save();
      res.json(updatedBackground);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

/**
 * Route , updating a background
 * @name delete/:id
 * @function
 * @memberof module:routes/backgrounds
 * @inner
 * @param {string} path - Express path
 * @param {callback} getBackground - Express middleware
 * @param {callback} callback - Express callback
 */
router.delete("/:id", getBackground, async (req, res) => {
  try {
    await res.background.remove();
    res.send("Deleted background.");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
