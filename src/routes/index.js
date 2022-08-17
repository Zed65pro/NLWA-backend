/**@module routes/index */

const express = require('express');
const router = express.Router();

const {welcome,dashboard} = require('../controllers/index');
const { isLoggedIn, isLoggedOut } = require('../middlewares/auth');

/**
 * Route , home route
 * @name get /
 * @function
 * @memberof module:routes/index
 * @inner
 * @param {string} path - Express path
 * @param {callback} isLoggedOut - Middleware 
 * @param {callback} welcome - Express callback controller function
 */
router.get('/', isLoggedOut,welcome);

/**
 * Route ,dashboard route for logged in users
 * @name get /
 * @function
 * @memberof module:routes/index
 * @inner
 * @param {string} path - Express path
 * @param {callback} isLoggedIn - Middleware 
 * @param {callback} dashboard - Express callback controller function
 */
router.get('/dashboard', isLoggedIn,dashboard)   ;

module.exports = router;