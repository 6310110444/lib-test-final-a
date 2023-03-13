const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/loginLimiter')

router.route('/')
    .post(loginLimiter, authController.signin)

router.route('/refresh')
    .get(authController.refresh)

router.route('/signout')
    .post(authController.signout)

module.exports = router