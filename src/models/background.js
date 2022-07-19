/**@module models/background */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Background schema for mongoose
 * @typedef {mongoose.Model} 
 */
const backgroundSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("background",backgroundSchema);