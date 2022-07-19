/**@module routes/servers */

const express = require("express");
/**
 * Router
 * @typedef {Router} router
 */
const router = express.Router();
/**@typedef {mongoose.Model}*/
const serverModel = require("../models/server");

/**
 * will check if validation has an error
 * @typedef {Function} validate - middleware
 */
const { validate } = require("../middlewares/validate");
/**
 * Validation of servers body - will act as middleware
 * @typedef {Function} validateAction - middleware
 */
const { validateServer } = require("../middlewares/serverValidation");

/**
 * Middleware function which gets a server based on it's id
 * @param {Request} req -Request
 * @param {Response} res -Response
 * @param {Function} next -next()
 * @returns {Response}
 */
const getServer = async (req, res, next) => {
  let server;

  try {
    server = await serverModel.findById(req.params.id);
    if (!server) return res.status(404).json({ message: "Server not found." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.server = server;
  next();
};

/**
 * Route , getting all servers
 * @name get/
 * @function
 * @memberof module:routes/servers
 * @inner
 * @param {string} path - Express path
 * @param {callback} callback - Express callback
 */
router.get("/", async (req, res) => {
  try {
    const servers = await serverModel.find();
    res.json(servers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Route , posting a server
 * @name post/
 * @function
 * @memberof module:routes/servers
 * @inner
 * @param {string} path - Express path
 * @param {callback} validateServer - Express middleware, validation
 * @param {callback} validate - Express middleware , validation
 * @param {callback} callback - Express callback
 */
router.post("/", validateServer, validate, async (req, res) => {
  const server = new serverModel({
    title: req.body.title,
    status: req.body.status,
  });

  try {
    const newServer = await server.save();
    res.status(201).json(newServer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * Route , getting a server based on id
 * @name get/:id
 * @function
 * @memberof module:routes/servers
 * @inner
 * @param {string} path - Express path
 * @param {callback} getServer - Express middleware 
 * @param {callback} callback - Express callback
 */
router.get("/:id", getServer, (req, res) => {
  res.json(res.server);
});

/**
 * Route , updating a server
 * @name put/:id
 * @function
 * @memberof module:routes/servers
 * @inner
 * @param {string} path - Express path
 * @param {callback} validateServer - Express middleware, validation
 * @param {callback} validate - Express middleware , validation
 * @param {callback} getServer - Express middleware 
 * @param {callback} callback - Express callback
 */
router.put("/:id", validateServer, validate, getServer, async (req, res) => {
  res.server.title = req.body.title;
  res.server.status = req.body.status;

  try {
    const updatedServer = await res.server.save();
    res.json(updatedServer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * Route , deleting a server
 * @name delete/:id
 * @function
 * @memberof module:routes/server
 * @inner
 * @param {string} path - Express path
 * @param {callback} getServer - Express middleware 
 * @param {callback} callback - Express callback
 */
router.delete("/:id", getServer, async (req, res) => {
  try {
    await res.server.remove();
    res.send("Deleted server.");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
