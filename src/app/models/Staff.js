const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Staff = new Schema(
    {
        name: { type: String, required: true },
        level: { type: String, required: true },
        phone: { type: Number, required: true },
        slug: { type: String, slug: 'name', unique: true },
    },
    { timestamps: true },
);

module.exports = mongoose.model('User', Staff);
