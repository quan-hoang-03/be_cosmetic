const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController.js");
const { authUserMiddleware } = require("../middleware/authMiddleWare");

//api tạo order
router.post("/create", OrderController.createOrder);
router.get("/get-all-order", OrderController.getAllOrder);

module.exports = router;
