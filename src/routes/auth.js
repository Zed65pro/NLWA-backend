/**@module routes/auth */

const express = require('express');
/**
 * Router
 * @typedef {Router} router
 */
const router = express.Router();

const {login,googleCallbackAuthenticate,googleCallback,logout} = require('../controllers/auth');
const {isLoggedOut, isLoggedIn} = require('../middlewares/auth');

/**
 * Route , authenticating login with google
 * @name get auth/google
 * @function
 * @memberof module:routes/auth
 * @inner
 * @param {string} path - Express path
 * @param {callback} isLoggedOut - Middleware to authenticate login
 * @param {callback} login - Express callback controller function
 */
router.get('/google', isLoggedOut,login);

/**
 * Route , google authentication callback
 * @name get auth/google/callback
 * @function
 * @memberof module:routes/auth
 * @inner
 * @param {string} path - Express path
 * @param {callback} googleCallbackAuthenticate - Middleware 
 * @param {callback} googleCallback - Express callback controller function
 */
router.get('/google/callback', googleCallbackAuthenticate, googleCallback);

/**
 * Route , logout
 * @name get auth/logout
 * @function
 * @memberof module:routes/auth
 * @inner
 * @param {string} path - Express path
 * @param {callback} isLoggedIn - Middleware to check if user is logged in
 * @param {callback} logout - Express callback controller function
 */
router.get('/logout',isLoggedIn,logout);

module.exports = router;