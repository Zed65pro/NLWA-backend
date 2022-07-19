/**@module middlewares/messageValidation */
/**
 * express validator - check
 * @typedef {ValidationChain} check
 */
const { check } = require("express-validator");

/**
 * Message validation schema and validation chain
 * @typedef {ValidationChain[]} validateMessage
 */
exports.validateMessage = [
  check("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("title is missing!")
    .isLength({ min: 3, max: 12 })
    .withMessage(
      "title must be atleast 3 characters and atmost 12 characters!"
    ),
  check("body")
    .not()
    .isEmpty()
    .withMessage("Body is missing!")
];
