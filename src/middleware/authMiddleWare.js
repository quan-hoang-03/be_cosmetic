const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

//kiểm tra người dùng có phải là admin hay không
const authMiddleware = (req,res,next) =>{
    //Lấy token từ phần header của request, Sử dụng split(' ') để tách chuỗi token, Lấy phần tử thứ 2 của mảng sau khi tách
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, 'access_token', function(err, user) {
        // Callback function được gọi sau khi xác minh token
        if(err){
            // Nếu có lỗi trong quá trình xác minh token
            return res.status(404).json({
                message:"The authentication",
                status:'error'
            })
        }
    
        // Kiểm tra xem user có phải admin không
        if(user?.isAdmin){
            // Nếu là admin, cho phép tiếp tục request
            next()
        }else{
            // Nếu không phải admin, trả về lỗi
            return res.status(404).json({
                message:"The authentication",
                status:'error'
            })
        }
    });
}
// Tự đông cấp token mới khi token hết hạn
const authUserMiddleware = (req,res,next) =>{
    //Lấy token từ phần header của request, Sử dụng split(' ') để tách chuỗi token, Lấy phần tử thứ 2 của mảng sau khi tách
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    jwt.verify(token, 'access_token', function(err, user) {
        if(err){
            return res.status(404).json({
                message:"The authentication",
                status:'error'
            })
        }
        if(user?.isAdmin || user?.id === userId){
            next()
        }else{
            return res.status(404).json({
                message:"The authentication",
                status:'error'
            })
        }
        console.log('user', user)
    });
}

module.exports = {
    authMiddleware,
    authUserMiddleware
}