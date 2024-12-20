const express = require('express');
const router = express.Router()
const userController = require('../controllers/UserController');
const { authMiddleware,authUserMiddleware } = require('../middleware/authMiddleWare');

//api đăng ký
router.post('/sign-up',userController.createUser)
//api đăng nhập
router.post('/sign-in',userController.loginUser)
//api logout
router.post('/log-out',userController.logOutUser)
//api cập nhật thông tin người dùng
//Thêm authUserMiddleware để chỉ chính user đó có thể update theo user đó
router.put('/update-user/:id',authUserMiddleware,userController.updateUser)
//Xóa thông tin người dùng
router.delete('/delete-user/:id',authMiddleware,userController.deleteUser)
//get all users
router.get('/getAll',authMiddleware, userController.getAllUser)
//detail user
router.get('/get-details/:id',authUserMiddleware,userController.getDetailsUser)
//api refresh_token
router.post('/refresh-token',userController.refreshToken)
//api xóa all sản phẩm
router.post("/delete-many", userController.deleteMany);

module.exports = router