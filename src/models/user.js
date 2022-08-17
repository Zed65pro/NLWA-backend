/**@module models/user */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * User schema for mongoose
 * @typedef {mongoose.Model}
 */
const userSchema = new Schema({
  googleId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("user", userSchema);
