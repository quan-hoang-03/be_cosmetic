const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser = async (req,res)=>{
    try{
        const {email,password,confirmPassword} = req.body
        const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isCheckEmail = reg.test(email)
        if( !email || !password || !confirmPassword ){
            return res.status(200).json({
                status: 'ERR',
                message: 'Hãy nhập vào'
            })
        }else if(!isCheckEmail){
            return res.status(200).json({
                status:'ERR',
                message: 'Email là bắt buộc'
            })
        }else if(password !== confirmPassword){
            return res.status(200).json({
                status:'ERR',
                message: 'Mật khẩu không giống nhau'
            })
        }
        // Đưa req.body sang UserService
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body
        const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isCheckEmail = reg.test(email)
        if( !email || !password ){
            return res.status(200).json({
                status: 'ERR',
                message: 'Tài khoản hoặc mật khẩu chưa đúng'
            })
        }else if(!isCheckEmail){
            return res.status(200).json({
                status:'ERR',
                message: 'Email là bắt buộc'
            })
        }
        // Đưa req.body sang UserService
        const response = await UserService.loginUser(req.body)
        const {refresh_token,...newRespone} = response

        //config refresh_token vào cookie
        res.cookie('refresh_token',refresh_token,{
            httpOnly: true,
            Secure: false,
            samesite: 'strict'
        })
        return res.status(200).json(newRespone)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const updateUser = async (req,res)=>{
    try{
        const userId = req.params.id
        const data = req.body
        if(!userId){
            return res.status(200).json({
                status:'ERR',
                message: 'Không tồn tại ID người dùng '
            })
        }
        // Đưa req.body sang UserService
        const response = await UserService.updateUser(userId,data)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const deleteUser = async (req,res)=>{
    try{
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status:'ERR',
                message: 'ID người dùng là bắt buộc '
            })
        }
        // Đưa req.body sang UserService
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const getAllUser = async (req,res)=>{
    try{
        // Đưa req.body sang UserService
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const getDetailsUser = async (req,res)=>{
    try{
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status:'ERR',
                message: 'ID người dùng là bắt buộc '
            })
        }
        // Đưa req.body sang UserService
        const response = await UserService.getDetailsUser(userId)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const refreshToken = async (req,res)=>{
    try{
        const token = req.cookies.refresh_token
        if(!token){
            return res.status(200).json({
                status:'ERR',
                message: 'Token là bắt buộc'
            })
        }
        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const logOutUser = async (req,res)=>{
    try{
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status:'OK',
            message:'Bạn đã đăng xuất thành công'
        })
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports ={
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logOutUser
}