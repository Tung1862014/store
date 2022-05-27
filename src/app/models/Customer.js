const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema(
    {
        name: { type: String, required: true },
        nameUser: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: Number, required: true },
        status: { type: String, required: true },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Customer', Customer);
