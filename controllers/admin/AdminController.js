const CourseModel = require('../../models/Course')
const UserModel = require('../../models/User')

class AdminController {

    static dashboard = async (req, res) => {

        try {
            const { username, email, image } = req.user
            const user = await UserModel.find({ n: username, e: email })
            // console.log(user)
            const result = await CourseModel.find()
            // console.log(result)
            res.render('admin/dashboard', { data: user, n: username, image: image })
        } catch (err) {
            console.log(err)
        }
    }
    // static dashboard = async (req, res) => {
    //     const { username, email } = req.user
    //     res.render('admin/dashboard', { n: username, e: email })
    // }

    static DisplayData = async (req, res) => {

        try {
            const { username, image } = req.user
            const result = await CourseModel.find()
            // console.log(result)
            res.render('admin/DisplayData', { data: result, n: username, image: image })
        } catch (err) {
            console.log(err)
        }
    }
    static ViewData = async (req, res) => {

        try {
            const { username, image } = req.user
            const result = await CourseModel.findById(req.params.id)
            // console.log(result)
            res.render('admin/ViewData', { data: result, n: username, image: image })
        } catch (err) {
            console.log(err)
        }
    }
    static DeleteCourse = async (req, res) => {
        // console.log(req.params.id)
        // console.log(req.body)
        try {
            const result = await CourseModel.findByIdAndDelete(req.params.id)
            // console.log(result)
            res.redirect('/DisplayData');
        } catch (err) {
            console.log(err)
        }
    }
}
module.exports = AdminController

