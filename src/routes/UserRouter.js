const express = require('express');
const router = express.Router()
const userController = require('../controllers/UserController');
const { authMiddleware } = require('../middleware/authMiddleWare');

//api đăng ký
router.post('/sign-up',userController.createUser)
//api đăng nhập
router.post('/sign-in',userController.loginUser)
//api cập nhật thông tin người dùng
router.put('/update-user/:id',userController.updateUser)
//Xóa thông tin người dùng
router.delete('/delete-user/:id',authMiddleware,userController.deleteUser)
//get all users
router.get('/getAll',authMiddleware, userController.getAllUser)
//detail user
router.get('/get-details/:id',userController.getDetailsUser)

module.exports = router