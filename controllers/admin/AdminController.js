const CourseModel = require('../../models/Course')
const UserModel = require('../../models/User')

class AdminController {

    static dashboard = async (req, res) => {

        try {
            const { username,email } = req.user
            const user = await UserModel.find({ n: username, e: email  })
            // console.log(user)
            const result = await CourseModel.find()
            // console.log(result)
            res.render('admin/dashboard', { data:user ,n: username })
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
            const { username } = req.user
            const result = await CourseModel.find()
            // console.log(result)
            res.render('admin/DisplayData', { data: result, n: username })
        } catch (err) {
            console.log(err)
        }
    }
    static ViewData = async (req, res) => {

        try {
            const { username } = req.user
            const result = await CourseModel.findById(req.params.id)
            // console.log(result)
            res.render('admin/ViewData', { data: result, n: username })
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