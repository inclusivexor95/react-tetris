const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const scoreSchema = new Schema(
    {
        score: {
            type: Number,
            required: true
        },
        level: {
            type: Number,
            required: true
        },
        linesCleared: {
            type: Number,
            required: true
        },
        userName: String
    }
);


module.exports = mongoose.model('Score', scoreSchema);