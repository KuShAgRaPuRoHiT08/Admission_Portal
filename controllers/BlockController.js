const UserModel = require('../models/User')
const CourseModel = require('../models/Course')


class BlockController {

    static home = async (req, res) => {
        res.render('User/login', { message: req.flash('error') })

    }
    static forgot_pg = async (req, res) => {
        
        res.render('User/forgot_password', { message: req.flash('error')})

    }
    static reset_password = async (req, res) => {
        
        res.render('User/reset_password', { message: req.flash('error')})

    }


    static Course = async (req, res) => {
        const { username, image, _id } = req.user
        const btech = await CourseModel.findOne({ user: _id, course: 'B.Tech' })
        const mtech = await CourseModel.findOne({ user: _id, course: 'M.Tech' })
        const mba = await CourseModel.findOne({ user: _id, course: 'MBA' })
        // console.log(username)
        res.render('Course/course', { n: username, image: image, b: btech, m: mtech, mb: mba })
    }
    static Course_form = (req, res) => {
        const { username, email, image } = req.user
        res.render('Course/course_form', { n: username, e: email, image: image })
    }
    static Course_form2 = (req, res) => {
        const { username, email, image } = req.user
        res.render('Course/course_form2', { n: username, e: email, image: image })
    }
    static Course_form3 = (req, res) => {
        const { username, email, image } = req.user
        res.render('Course/course_form3', { n: username, e: email, image: image })
    }

}




module.exports = BlockController