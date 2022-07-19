/**@module middlewares/userValidation */
/**
 * express validator - check
 * @typedef {ValidationChain} check
 */
const { check } = require("express-validator");

/**
 * User validation schema and validation chain
 * @typedef {ValidationChain[]} validateUser
 */
exports.validateUser = [
  check("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Username is missing!")
    .isLength({ min: 3, max: 12 })
    .withMessage(
      "Username must be atleast 3 characters and atmost 12 characters!"
    ),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters!"),
  check("email").normalizeEmail().isEmail().withMessage("Email is not valid!"),
];
