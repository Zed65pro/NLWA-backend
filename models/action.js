const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const action = mongoose.model("action",actionSchema);

module.exports = action;