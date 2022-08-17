/**@module controllers/index */

module.exports = {
  /**
   * Controller function for home route
   * @param {Request} req -Request
   * @param {Response} res -Response
   * @returns {Response}
   */
  welcome: (req, res) => {
    res
      .status(200)
      .send("Welcome to this website, Please login via /auth/google");
  },
  /**
   * Controller function for dashboard route
   * @param {Request} req -Request
   * @param {Response} res -Response
   * @returns {Response}
   */
  dashboard: (req, res) => {
    res.status(200).send(`Welcome Mr.${req.user.fullName}`);
  },
};
