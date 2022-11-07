const UserModel = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class UserController {
    static register = async (req, res) => {
        res.render('User/register', { message: req.flash('error') })
    }

    static registerinsert = async (req, res) => {
        //console.log(req.body)
        const { username, email, password, confirmpassword } = req.body;
        const user = await UserModel.findOne({ email: email })
        if (user) {
            req.flash('error', 'This email is already exist')
            return res.redirect('/register')
        } else {
            if (username && email && password && confirmpassword) {
                if (password === confirmpassword) {
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hashpassword = await bcrypt.hash(password, salt)
                        const result = new UserModel({
                            username: username,
                            email: email,
                            password: hashpassword,
                        })
                        await result.save()
                        req.flash('error', 'Registered Successfully')
                        return res.redirect('/')
                    } catch {

                    }
                } else {
                    req.flash('error', 'Password does not match')
                    return res.redirect('/register')
                }
            } else {
                req.flash('error', 'All fields are required')
                return res.redirect('/register')
            }
        }
    }
    static verifylogin = async (req, res) => {
        // console.log(req.body)
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email: email })
            // console.log(user)
            if (user != null) {
                const isMatch = await bcrypt.compare(password, user.password)
                if ((user.email == email) && isMatch) {

                    //generate token

                    const token = jwt.sign({ userid: user._id }, 'kushagrapurohit08');
                    // console.log(token)
                    res.cookie('jwt', token)
                    if (user.role == 'student') {
                        return res.redirect('/course')
                    }
                    if (user.role == 'teacher') {
                        return res.redirect('/course')
                    }
                    else if (user.role == 'admin') {
                        return res.redirect('/dashboard')
                    }
                    else {
                        req.flash('error', 'Not Authorized User')
                        return res.redirect('/')
                    }

                } else {
                    req.flash('error', 'Email and Password does not match ')
                    return res.redirect('/')
                }
            } else {
                req.flash('error', 'Not registered')
                return res.redirect('/')
            }
        } catch (err) {
            console.log(err)
        }
    }
    static Logout = async (req, res) => {
        try {
            res.clearCookie('jwt')
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }

    }

}

module.exports = UserController