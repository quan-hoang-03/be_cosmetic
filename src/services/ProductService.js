const Product = require("../models/ProductModel")

const createProduct= (newProduct)=>{
    return new Promise( async (resolve,reject)=>{
        const {name,image,type,price,countInStock,rating,description, discount} = newProduct
        try{
            const checkProduct = await Product.findOne({
                name: name
            })
            if(checkProduct !== null){
                resolve({
                    status:'Ok',
                    message:'Tên sản phẩm đã tồn tại'
                })
            }
            const createdProduct = await Product.create({
              name,
              image,
              type,
              price,
              countInStock,
              rating,
              description,
              discount,
            });
            if(createdProduct){
                resolve({
                    status: 'Ok',
                    message:'Success',
                    data: createdProduct
                })
            }
        }catch(e){
            reject(e);
        }
    })
}
const updateProduct = (id,data)=>{
    return new Promise( async (resolve,reject)=>{
        try{
            const checkProduct = await Product.findOne({ _id: id });
            console.log('checkProduct',checkProduct)
            if(checkProduct === null){
                resolve({
                    status:'Ok',
                    message:'Sản phẩm không tồn tại'
                })
            }
            const updateProduct = await Product.findByIdAndUpdate(id,data,{new : true})
            resolve({
                status: 'Ok',
                message:'Success',
                data: updateProduct
            })
            console.log(data,"dataUpdate")
        }catch(e){
            reject(e);
        }
    })
}
const deleteProduct = (id)=>{
    return new Promise( async (resolve,reject)=>{
        try{
            const checkProduct = await Product.findOne({ _id: id });
            if(checkProduct === null){
                resolve({
                    status:'Ok',
                    message:'Sản phẩm không tồn tại'
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status: 'Ok',
                message:'Xóa sản phẩm thành công',
            })
        }catch(e){
            reject(e);
        }
    })
}
const deleteManyProduct = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({ _id: ids });
      resolve({
        status: "Ok",
        message: "Đã xóa tất cả sản phẩm",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailsProduct = (id)=>{
    return new Promise( async (resolve,reject)=>{
        try{
            const product = await Product.findOne({ _id: id });
            if(product === null){
                resolve({
                    status:'Ok',
                    message:'Sản phẩm không tồn tại'
                })
            }
            resolve({
                status: 'Ok',
                message:'Success',
                data: product
            })
        }catch(e){
            reject(e);
        }
    })
}
// limit dùng để phân trang
const getAllProduct = (limit, page, sort, filter)=>{
    return new Promise( async (resolve,reject)=>{
        try{
            const totalProduct = await Product.countDocuments()
            let allProduct = []
            if(filter){
                const label = filter[0]
                const allObjectFilter = await Product.find({ [label] : {'$regex': filter[1]}  }).limit(limit).skip(page * limit)
                resolve({
                    status: 'Ok',
                    message:'Success',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPages: Math.ceil(totalProduct/limit),
                })
            }
            if(sort){
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: 'Ok',
                    message:'Success',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPages: Math.ceil(totalProduct/limit),
                })
            }
            if(!limit){
                allProduct = await Product.find();
            }else{
                allProduct = await Product.find().limit(limit).skip(page*limit);
            }
            // skip : bỏ qua bao nhieu thg đầu tiên để lấy thg tiếp theo
            allProduct = await Product.find().limit(limit).skip(page*limit)
            resolve({
                status: 'Ok',
                message:'Success',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPages: Math.ceil(totalProduct/limit),
            })
        }catch(e){
            reject(e);
        }
    })
}
const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Product.distinct('type')
      resolve({
        status: "Ok",
        message: "Success",
        data: allType,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getDetailsProduct,
  getAllProduct,
  deleteManyProduct,
  getAllType,
};