/**@module controllers/auth */

const passport = require("passport");

module.exports = {
  /**
   * Controller function for authenticating login using google oauth2 and passportJS
   * @returns {Response}
   */
  login: passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
  /**
   * Controller function for google callback authentication
   * @returns {Response}
   */
  googleCallbackAuthenticate: passport.authenticate("google", {
    failureRedirect: "/auth/google",
  }),
  /**
   * Controller function for google callback authentication successful authentication
   * @returns {Response}
   */
  googleCallback: (req, res) => {
    res.redirect("/dashboard");
  },
  /**
   * Controller function for logging out user from session
   * @param {Request} req -Request
   * @param {Response} res -Response
   * @param {callback} next -express function
   * @returns {Response}
   */
  logout: (req, res, next) => {
    req.session.destroy();
    req.logout((err) => {
      if (err) return next(err);
    });
    res.redirect("/");
  },
};
