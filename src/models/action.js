/**@module models/action */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Action schema for mongoose
 * @typedef {mongoose.Model} 
 */
const actionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("action",actionSchema);