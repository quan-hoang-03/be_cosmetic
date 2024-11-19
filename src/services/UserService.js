const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshAccessToken } = require("./JWTService")

const createUser = (newUser)=>{
    return new Promise( async (resolve,reject)=>{
        const {name,email,password,confirmPassword,phone} = newUser
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser !== null){
                resolve({
                    status:'Ok',
                    message:'The email is already'
                })
            }
            //hash password mã hóa mật khẩu
            const hash = bcrypt.hashSync(password,10)
            const createdUser = await User.create({
                name,
                email,
                password : hash,
                confirmPassword : hash,
                phone
            })
            if(createdUser){
                resolve({
                    status: 'Ok',
                    message:'Success',
                    data: createdUser
                })
            }
        }catch(e){
            reject(e);
        }
    })
}
const loginUser = (userLogin)=>{
    return new Promise( async (resolve,reject)=>{
        const {name,email,password,confirmPassword,phone} = userLogin
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser === null){
                resolve({
                    status:'Ok',
                    message:'Email này chưa được đăng ký'
                })
            }
            const comparePassword = bcrypt.compareSync(password,checkUser.password)
            if(!comparePassword){
                resolve({
                    status: 'Ok',
                    message:'Mật khẩu hoặc tên đăng nhập không đúng',
                })
            }
            const access_token = await generalAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            const refresh_token = await generalRefreshAccessToken({
                ud: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            console.log('access_token',access_token)
            resolve({
                status: 'Ok',
                message:'Success',
                access_token,
                refresh_token
            })
        }catch(e){
            reject(e);
        }
    })
}
const updateUser = (id,data)=>{
    return new Promise( async (resolve,reject)=>{
        try{
            const checkUser = await User.findOne({ _id: id });
            console.log('checkUser',checkUser)
            if(checkUser === null){
                resolve({
                    status:'Ok',
                    message:'Người dùng không tồn tại'
                })
            }
            const updateUser = await User.findByIdAndUpdate(id,data,{new : true})
            resolve({
                status: 'Ok',
                message:'Success',
                data: updateUser
            })
        }catch(e){
            reject(e);
        }
    })
}
const deleteUser = (id)=>{
    return new Promise( async (resolve,reject)=>{
        try{
            const checkUser = await User.findOne({ _id: id });
            if(checkUser === null){
                resolve({
                    status:'Ok',
                    message:'Người dùng không tồn tại'
                })
            }
            await User.findByIdAndDelete(id)
            resolve({
                status: 'Ok',
                message:'Xóa người dùng thành công',
            })
        }catch(e){
            reject(e);
        }
    })
}
const getAllUser = ()=>{
    return new Promise( async (resolve,reject)=>{
        try{
            const allUser = await User.find()
            resolve({
                status: 'Ok',
                message:'Success',
                data: allUser
            })
        }catch(e){
            reject(e);
        }
    })
}
const getDetailsUser = (id)=>{
    return new Promise( async (resolve,reject)=>{
        try{
            const user = await User.findOne({ _id: id });
            if(user === null){
                resolve({
                    status:'Ok',
                    message:'Người dùng không tồn tại'
                })
            }
            resolve({
                status: 'Ok',
                message:'Success',
                data:user
            })
        }catch(e){
            reject(e);
        }
    })
}
module.exports ={
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
}