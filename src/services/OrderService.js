const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel");

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
      const promises = orderItems.map(async (order)=>{
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
            quality: { $gte: order.amount },
          },
          {
            $inc: {
              quality: -order.amount,
              selled: +order.quality,
            },
          },
          { new: true }
        )
        console.log('productData',productData)
        if (productData) {
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
            return {
              status: "OK",
              message: "Success",
            };
          }
        } else {
          resolve({
            status: "OK",
            message: "Error",
            data: [order.product],
          });
        }
      })
      const results = await Promise.all(promises)
      console.log(results,"thong tin san pham")
    } catch (e) {
      reject(e);
    }
  });
}; 
const getAllOrder = () =>{
    return new Promise(async(resolve, reject) =>{
        try{
            const allOrder = await Order.find()
            resolve({
                status: "Ok",
                message: "Success",
                data: allOrder
            })
        }catch(e){
            reject(e)
        }
    })
}
module.exports = {
  createOrder,
  getAllOrder
};