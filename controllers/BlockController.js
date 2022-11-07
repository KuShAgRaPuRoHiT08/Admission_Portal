const UserModel = require('../models/User')
const CourseModel = require('../models/Course')

class BlockController {

    static home = (req, res) => {
        res.render('User/login', { message: req.flash('error') })
    }

    static Course = async (req, res) => {
        const { username,_id } = req.user
        const btech = await CourseModel.findOne({ user: _id, course: 'B.Tech' })
        const mtech = await CourseModel.findOne({ user: _id, course: 'M.Tech' })
        const mba = await CourseModel.findOne({ user: _id, course: 'MBA' })
        // console.log(username)
        res.render('Course/course', { n: username, b: btech, m: mtech, mb: mba })
    }
    static Course_form = (req, res) => {
        const { username, email } = req.user
        res.render('Course/course_form', { n: username, e: email })
    }
    static Course_form2 = (req, res) => {
        const { username, email } = req.user
        res.render('Course/course_form2', { n: username, e: email })
    }
    static Course_form3 = (req, res) => {
        const { username, email } = req.user
        res.render('Course/course_form3', { n: username, e: email })
    }

}




module.exports = BlockController