
const mongoose = require('mongoose')

// schema or fields
const CourseSchema = new mongoose.Schema({
    username: {
        type: String,
        Required: true,
    },
    email: {
        type: String,
        Required: true,
       
    },
    mobile: {
        type: String,
        Required: true,
    },
    address: {
        type: String,
        Required: true,
    },
    gender: {
        type: String,
        Required: true,
    },
    college: {
        type: String,
        Required: true,
    },
    course: {
        type: String,
        Required: true,
    },
    branch: {
        type: String,
        Required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },


}, { timestamps: true })
// create model

const CourseModel = mongoose.model('Course', CourseSchema);//blog is name of collection

module.exports = CourseModel
