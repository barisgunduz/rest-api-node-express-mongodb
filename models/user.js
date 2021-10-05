const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        default: Date.now,
    },
    identityNumber: {
        type: Number,
        required: true,
    },
    phone: {
        type: Number,
    },
    address: {
        type: String,
    },
    website: {
        type: String,
    },
});

module.exports = mongoose.model("User", userSchema);
