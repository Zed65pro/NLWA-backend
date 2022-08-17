/**@module routes/messages */

const express = require("express");
/**
 * Router
 * @typedef {Router} router
 */
const router = express.Router();

const { validate } = require("../middlewares/validate");
const { validateMessage } = require("../middlewares/messageValidation");
const {getAllMessages,getMessage,postMessage,getMessageById,deleteMessage} = require("../controllers/messages");
/**
 * Route , getting all messages
 * @name get/
 * @function
 * @memberof module:routes/messages
 * @inner
 * @param {string} path - Express path
 * @param {callback} callback - Express callback
 */
router.get("/", getAllMessages);

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
router.post("/", validateMessage, validate, postMessage);

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
router.get("/:id", getMessage, getMessageById);

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
router.delete("/:id", getMessage, deleteMessage);

module.exports = router;
