const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Staff = new Schema(
    {
        stt: { type: Number, required: true },
        name: { type: String, required: true },
        level: { type: String, required: true },
        phone: { type: Number, required: true },
    },
    { timestamps: true },
);

module.exports = mongoose.model('User', Staff);
