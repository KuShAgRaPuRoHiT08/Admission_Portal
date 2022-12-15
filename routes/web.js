const express = require('express')

const UserController = require('../controllers/UserController')
const BlockController = require('../controllers/BlockController')
const FormController = require('../controllers/FormController')

const { CheckUserAuth, AuthRole } = require('../middleware/Auth')//middleware
const AdminController = require('../controllers/admin/AdminController')


const router = express.Router()

// Block Controller


router.get('/', BlockController.home)
router.get('/Course', CheckUserAuth, BlockController.Course)
router.get('/course_form', CheckUserAuth, BlockController.Course_form)
router.get('/course_form2', CheckUserAuth, BlockController.Course_form2)
router.get('/course_form3', CheckUserAuth, BlockController.Course_form3)



//User Controller

router.get('/register', UserController.register)
router.post('/registerinsert', UserController.registerinsert)
router.post('/verifylogin', UserController.verifylogin)
router.get('/logout', UserController.Logout)

//Form Controller

router.get('/DisplayCourse', CheckUserAuth, FormController.DisplayCourse)
router.get('/ViewCourse/:id', CheckUserAuth, FormController.ViewDisplay)
router.get('/EditCourse/:id', CheckUserAuth, FormController.EditCourse)
router.post('/UpdateCourse/:id', CheckUserAuth, FormController.UpdateCourse)
router.post('/courseinsert', CheckUserAuth, FormController.courseinsert)

//admin controller

router.get('/dashboard', CheckUserAuth, AuthRole('admin'), AdminController.dashboard)
router.get('/DisplayData', CheckUserAuth, AuthRole('admin'), AdminController.DisplayData)
router.get('/ViewData/:id', CheckUserAuth, AuthRole('admin'), AdminController.ViewData)
router.get('/DeleteData/:id', CheckUserAuth, AuthRole('admin'), AdminController.DeleteCourse)


//Forgot password

router.get("/forgot_password", BlockController.forgot_pg);

router.get("/reset_password/:id/:token", BlockController.reset_password);

router.post("/forgot_password", UserController.forgot_password);

router.post("/reset_password/:id/:token", UserController.reset_password);

module.exports = router;