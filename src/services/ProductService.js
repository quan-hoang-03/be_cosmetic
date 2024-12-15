const Product = require("../models/ProductModel")

const createProduct= (newProduct)=>{
    return new Promise( async (resolve,reject)=>{
        const {name,image,type,price,countInStoke,rating,description} = newProduct
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
                name,image,type,price,countInStoke,rating,description
            })
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
            await Product.findByIdAndDelete(id)
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
const getAllProduct = ()=>{
    return new Promise( async (resolve,reject)=>{
        try{
            const allProduct = await Product.find()
            resolve({
                status: 'Ok',
                message:'Success',
                data: allProduct
            })
        }catch(e){
            reject(e);
        }
    })
}
module.exports ={
    createProduct,
    updateProduct,
    deleteProduct,
    getDetailsProduct,
    getAllProduct
}