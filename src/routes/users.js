/**@module routes/users */

const express = require("express");
/**
 * Router
 * @typedef {Router} router
 */
const router = express.Router();

const { validate } = require("../middlewares/validate");
const { validateUser } = require("../middlewares/userValidation");
const {getAllUsers,getUserById,getUser,postUser,deleteUser,updateUser} = require("../controllers/users");

/**
 * Route , getting all users
 * @name get users/
 * @function
 * @memberof module:routes/users
 * @inner
 * @param {string} path - Express path
 * @param {callback} callback - Express callback
 */
router.get("/", getAllUsers);

/**
 * Route , getting a user based on id
 * @name get users/:id
 * @function
 * @memberof module:routes/users
 * @inner
 * @param {string} path - Express path
 * @param {callback} getUser - Express middleware 
 * @param {callback} callback - Express callback
 */
 router.get("/:id", getUser, getUserById);

/**
 * Route , posting a user
 * @name post users/
 * @function
 * @memberof module:routes/users
 * @inner
 * @param {string} path - Express path
 * @param {callback} validateUser - Express middleware, validation
 * @param {callback} validate - Express middleware , validation
 * @param {callback} callback - Express callback
 */
router.post("/", validateUser, validate, postUser);

/**
 * Route , updating a user
 * @name put users/:id
 * @function
 * @memberof module:routes/users
 * @inner
 * @param {string} path - Express path
 * @param {callback} validateUser - Express middleware, validation
 * @param {callback} validate - Express middleware , validation
 * @param {callback} getUser - Express middleware 
 * @param {callback} callback - Express callback
 */
router.put("/:id", validateUser, validate, getUser, updateUser);

/**
 * Route , deleting a server
 * @name delete users/:id
 * @function
 * @memberof module:routes/users
 * @inner
 * @param {string} path - Express path
 * @param {callback} getUser - Express middleware 
 * @param {callback} callback - Express callback
 */
router.delete("/:id", getUser, deleteUser);

module.exports = router;
