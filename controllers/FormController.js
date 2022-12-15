const CourseModel = require('../models/Course')

class FormController {


    static courseinsert = async (req, res) => {
        //  console.log(user) 
        try {
            const { username, email, mobile, address, gender, college, course, branch } = req.body
            const result = new CourseModel({
                username: username,
                email: email,
                mobile: mobile,
                address: address,
                gender: gender,
                college: college,
                course: course,
                branch: branch,
                user: req.user.id

            })
            //saving data
            await result.save()
            res.redirect('/DisplayCourse')//route ka url jispe apko pochana h user ko
            // console.log(result)
        } catch (err) {
            console.log(err)
        }
    }

    static DisplayCourse = async (req, res) => {

        try {
            const { username, image, _id } = req.user
            const result = await CourseModel.find({ user: _id })
            //  console.log(result)
            res.render('Course/DisplayCourse', { data: result, n: username, image: image })
        } catch (err) {
            console.log(err)
        }
    }
    static ViewDisplay = async (req, res) => {

        try {
            const { username, image } = req.user
            const result = await CourseModel.findById(req.params.id)
            // console.log(result)
            res.render('Course/ViewCourse', { data: result, n: username, image: image })
        } catch (err) {
            console.log(err)
        }
    }
    static EditCourse = async (req, res) => {

        try {
            const { username, image } = req.user
            const result = await CourseModel.findById(req.params.id)
            //    console.log(result)
            res.render('Course/EditCourse', { data: result, n: username, image: image })
        } catch (err) {
            console.log(err)
        }
    }
    static UpdateCourse = async (req, res) => {
        // console.log(req.params.id)
        // console.log(req.body)

        try {
            const { username, image } = req.user
            const result = await CourseModel.findByIdAndUpdate(req.params.id, req.body)
            // console.log(result)
            res.redirect('/DisplayCourse');
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = FormController