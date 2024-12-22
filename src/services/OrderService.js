const Order = require("../models/OrderProduct");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      phone,
      user, // Thêm user vào đây
    } = newOrder;
    try {
      const createdOrder = await Order.create({
        orderItems,
        shippingAddress: {
          fullName,
          address,
          phone,
        },
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        user: user, // Sử dụng user từ newOrder
      });
      if (createdOrder) {
        resolve({
          status: "OK",
          message: "Success",
          data: createdOrder,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createOrder,
};