const ProductService = require('../services/ProductService')

const createProduct = async (req,res)=>{
    try{
        const {name,image,type,price,countInStock,rating,description} = req.body
        console.log(req.body,"product body")
        if(!name || !image || !type || !price || !countInStock || !rating){
            return res.status(200).json({
                status: 'ERR',
                message: 'Đầu vào là bắt buộc'
            })
        }
        // Đưa req.body sang ProductService
        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const updateProduct = async (req,res)=>{
    try{
        const productId = req.params.id
        const data = req.body
        console.log(productId,"product body")
        console.log(data,"data body")
        if(!productId){
            return res.status(200).json({
                status:'ERR',
                message: 'Không tồn tại ID sản phẩm'
            })
        }
        // Đưa req.body sang ProductService
        const response = await ProductService.updateProduct(productId,data)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const deleteProduct = async (req,res)=>{
    try{
        const productId = req.params.id
        if(!productId){
            return res.status(200).json({
                status:'ERR',
                message: 'Không tồn tại ID sản phẩm'
            })
        }
        // Đưa req.body sang ProductService
        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const deleteMany = async (req, res) => {
  try {
    const ids = req.body.ids;
    console.log(req.body, "body");
    if (!ids) {
      return res.status(200).json({
        status: "ERR",
        message: "Không tồn tại ID sản phẩm",
      });
    }
    // Đưa req.body sang ProductService
    const response = await ProductService.deleteManyProduct(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getDetailsProduct = async (req,res)=>{
    try{
        const productId = req.params.id
        if(!productId){
            return res.status(200).json({
                status:'ERR',
                message: 'Không tồn tại ID sản phẩm'
            })
        }
        // Đưa req.body sang ProductService
        const response = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const getAllProduct = async (req,res)=>{
    try{
        const {limit,page,sort,filter} = req.query
        // Đưa req.body sang ProductService
        const response = await ProductService.getAllProduct(Number(limit) || null,Number(page) || 0,sort,filter)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const getAllType = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    // Đưa req.body sang ProductService
    const response = await ProductService.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getDetailsProduct,
  getAllProduct,
  deleteMany,
  getAllType,
};