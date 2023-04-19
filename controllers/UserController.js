const UserModel = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require("cloudinary").v2;
const nodemailer = require('nodemailer')

const sendResetPasswordMail = async (name, email, link) => {
    // console.log(link)
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "kushagrapurohit08@gmail.com",
                pass: 'trslfittmgihmisz'
            },
            port: process.env.PORT,
            host: 'smtp.gmail.com'
        })

        const mailOptions = {
            from: 'kushagrapurohit08@gmail.com',
            to: email,
            subject: '[Admission Portal] Password Reset E-mail',
            // html:'<p> Hii ' + name + ',<br> Please click on this link '+ link +'  for Reset your password'
            html: `You're receiving this e-mail because you or someone else has requested a password reset for your user account at . <br><br>
  
        Click the link below to reset your password: <br>` + link + `<br> <br> If you did not request a password reset you can safely ignore this email.`
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Mail has been sent :-' + info.response);
            }
        })

    } catch (error) {
        console.log(error);
    }
}

cloudinary.config({
    cloud_name: "dwyeyqlcc",
    api_key: "845734591943639",
    api_secret: "Ydw55qkpRC_aM-1IgxkfP2ZEnfY",
    secure: true,
});

class UserController {
    static register = async (req, res) => {
        res.render('User/register', { message: req.flash('error') })
    }

    static registerinsert = async (req, res) => {
        //console.log(req.body)
        const { username, email, password, confirmpassword, profile_image } = req.body;
        // console.log(req.body)
        // res.send("register successfully")
        const user = await UserModel.findOne({ email: email })
        if (user) {
            req.flash('error', 'This email is already exist')
            return res.redirect('/register')
        } else {
            if (username && email && password && confirmpassword) {
                if (password === confirmpassword) {
                    try {
                        const imagefile = req.files.profile_image
                        // console.log(imagefile);
                        const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
                            folder: 'Profile_pictures',
                            width: 400,
                        })

                        const salt = await bcrypt.genSalt(10)
                        const hashpassword = await bcrypt.hash(password, salt)
                        const result = new UserModel({
                            username: username,
                            email: email,
                            password: hashpassword,
                            image: {
                                public_id: image_upload.public_id,
                                url: image_upload.secure_url,
                            },
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

    static forgot_password = async (req, res) => {
        try {
            const email = req.body.email
            const userData = await UserModel.findOne({ email: email });

            if (userData) {
                const secret = process.env.JWT_SECRET_KEY + userData.password
                const token = jwt.sign({ userId: userData._id }, secret, {
                    expiresIn: '15m'
                })
                const link = `https://admission-portal.onrender.com/reset_password/${userData._id}/${token}`
                // console.log(link);
                // calling method
                sendResetPasswordMail(userData.name, userData.email, link)
                req.flash('error', 'Please check your Email for Reset password link')
                res.redirect('/');
            } else {
                req.flash('error', 'This Email does not exist')
                res.redirect('/forgot_password')
            }

        } catch (error) {
            console.log(error);
        }

    }

    static reset_password = async (req, res) => {

        try {
            const { id, token } = req.params
            
            const { password, confirm_password } = req.body
            // console.log(req.body);

            const user = await UserModel.findById(req.params.id)
            // console.log(user);
            if (id !== user.id) {
                
                req.flash('error', 'Unauthorized reset password')
                res.render('User/reset_password')
            }
            const secret = process.env.JWT_SECRET_KEY + user.password
            const verfiyToken = jwt.verify(token, secret)

            if (password === confirm_password) {
                // console.log(password + confirm_password);
                const hashpassword = await bcrypt.hash(password, 10);
                // console.log(hashpassword);
                const result = await UserModel.findByIdAndUpdate(req.params.id, { password: hashpassword })
                await result.save()
                req.flash('error', 'Password Changed successfully Do login!')
                res.redirect("/")
            }
        } catch (error) {
            console.log(error);
        }

    }

}

module.exports = UserController