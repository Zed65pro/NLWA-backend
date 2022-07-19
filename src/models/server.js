/**@module models/server */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * server schema for mongoose
 * @typedef {mongoose.Model} 
 */
const serverSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true
    }
});



module.exports = mongoose.model("server",serverSchema);