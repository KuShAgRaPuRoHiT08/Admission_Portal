
const mongoose = require('mongoose')

// schema or fields
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        Required: true,
    },
    email: {
        type: String,
        Required: true,
        unique: true
    },
    password: {
        type: String,
        Required: true,
    },
    role: {
        type: String,
        default:'student'
    }


}, { timestamps: true })
// create model

const UserModel = mongoose.model('User', UserSchema);//blog is name of collection

module.exports = UserModel
