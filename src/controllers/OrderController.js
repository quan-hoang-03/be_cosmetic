const OrderService = require("../services/OrderService.js");

const createOrder = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      phone,
      user,
    } = req.body;

    if (
      !orderItems ||
      !paymentMethod ||
      !itemsPrice ||
      !shippingPrice ||
      !totalPrice ||
      !fullName ||
      !address ||
      !phone ||
      !user
    ) {
      return res.status(400).json({
        status: "ERR",
        message: "Thiếu thông tin đặt hàng",
      });
    }

    // Kiểm tra orderItems có phải là mảng và có items không
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({
        status: "ERR",
        message: "orderItems phải là một mảng và không được rỗng",
      });
    }

    const response = await OrderService.createOrder(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Create order error:", e);
    return res.status(500).json({
      status: "ERR",
      message: "Lỗi server",
      error: e.message,
    });
  }
};
module.exports = {
  createOrder,
};
