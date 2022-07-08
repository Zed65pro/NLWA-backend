const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serverSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    Status: {
        type: Boolean,
        required: true
    }
});

const server = mongoose.model("server",serverSchema);

module.exports = server;