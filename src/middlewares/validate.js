/**@module middlewares/validate */

/**
 * Result after validation which contains the error
 * @typedef {ResultFactory<ValidationError>} validationResult
 */
const { validationResult } = require("express-validator");

/**
 * Function which will be exported to check validation errors
 * @param {Request} req - Request
 * @param {Response} res - Response
 * @param {Function} next - next()
 * @returns {void}
 */
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  next();
};
