/**@module models/message */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Message schema for mongoose
 * @typedef {mongoose.Model} 
 */
const messageSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    dateCreatedAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model("message",messageSchema);