const express = require('express');
const router = express.Router()
const productController = require('../controllers/ProductController');
const { authMiddleware } = require('../middleware/authMiddleWare');

//api tạo sản phẩm
router.post('/create',productController.createProduct)
//api sửa sản phẩm
router.put('/update/:id',authMiddleware,productController.updateProduct)
//api xóa sản phẩm
router.delete('/delete/:id',authMiddleware, productController.deleteProduct)
//api xem chi tiết sản phẩm
router.get('/get-details/:id',productController.getDetailsProduct)
//api get list sản phẩm
router.get('/get-all', productController.getAllProduct)
//api xóa all sản phẩm
router.post("/delete-many", productController.deleteMany);
//api lấy type product
router.get("/get-all-type", productController.getAllType);

module.exports = router