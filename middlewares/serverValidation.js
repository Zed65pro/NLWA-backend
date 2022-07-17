const { check } = require("express-validator");

exports.validateServer = [
  check("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("title is missing!")
    .isLength({ min: 3, max: 12 })
    .withMessage(
      "title must be atleast 3 characters and atmost 12 characters!"
    ),
  check("status")
    .not()
    .isEmpty()
    .withMessage("status is missing!")
];
