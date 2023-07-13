const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
        // unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    token: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isSuperAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel