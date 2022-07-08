const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const background = mongoose.model("background",backgroundSchema);

module.exports = background;