/** @module middlewares/auth */

module.exports = {
  /**
   * Middleware function to check if user is already logged in and is in session
   * @param {Request} req -Request
   * @param {Response} res -Response
   * @param {Function} next -next()
   * @returns {Response}
   */
  isLoggedIn: (req, res, next) => {
    if (req.user) {
      return next();
    }
    console.log("You need to log in first");
    res.redirect("/auth/google");
  },
  /**
   * Middleware function to check if no user exists in session (logged out)
   * @param {Request} req -Request
   * @param {Response} res -Response
   * @param {Function} next -next()
   * @returns {Response}
   */
  isLoggedOut: (req, res, next) => {
    if (!req.user) {
      return next();
    }
    res.redirect("/dashboard");
  },
};
