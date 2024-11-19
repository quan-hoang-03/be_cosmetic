const express = require('express');
const router = express.Router()
const userController = require('../controllers/UserController')

//api đăng ký
router.post('/sign-up',userController.createUser)
//api đăng nhập
router.post('/sign-in',userController.loginUser)
//api cập nhật thông tin người dùng
router.put('/update-user/:id',userController.updateUser)

module.exports = router