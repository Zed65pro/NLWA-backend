const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const message = mongoose.model("message",messageSchema);

module.exports = message;