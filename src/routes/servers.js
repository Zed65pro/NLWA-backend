/**@module routes/servers */

const express = require("express");
/**
 * Router
 * @typedef {Router} router
 */
const router = express.Router();

const { validate } = require("../middlewares/validate");
const { validateServer } = require("../middlewares/serverValidation");
const {
  getAllServers,
  getServerById,
  getServer,
  postServer,
  updateServer,
  deleteServer,
} = require("../controllers/servers");

/**
 * Route , getting all servers
 * @name get/
 * @function
 * @memberof module:routes/servers
 * @inner
 * @param {string} path - Express path
 * @param {callback} callback - Express callback
 */
router.get("/", getAllServers);

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
router.post("/", validateServer, validate, postServer);

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
router.get("/:id", getServer, getServerById);

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
router.put("/:id", validateServer, validate, getServer, updateServer);

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
router.delete("/:id", getServer, deleteServer);

module.exports = router;
