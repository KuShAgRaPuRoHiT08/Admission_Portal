const UserModel = require('../models/User')
const jwt = require('jsonwebtoken');

const CheckUserAuth = async (req, res, next) => {
    // console.log("hello")
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.redirect('/')

        } else {
            const verifyuser = jwt.verify(token, 'kushagrapurohit08')
            // console.log(verifyuser) 
            const user = await UserModel.findOne({ _id: verifyuser.userid })
            req.user = user
            // console.log(req.user.id)
            next();
        }
    } catch (err) {
        console.log(err)
    }
}

const AuthRole = (roles) => {
    return (req, res, next) => {
        // console.log(req.user.role)
        // console.log(roles)
        if (!roles.includes(req.user.role)) {
            return res.redirect('/course')
        }
        next();
    }
}
module.exports = {
    CheckUserAuth,
    AuthRole
}