const jwt = require('jsonwebtoken')

const generalAccessToken = async (payload) =>{
    const access_token = jwt.sign({
        ...payload 
    },'access_token',{expiresIn:'1h'})
// expiresIn thời gian token hết hạn
    return access_token
}
const generalRefreshAccessToken = async (payload) =>{
    const refresh_token = jwt.sign({
        ...payload 
    },'refresh_token',{expiresIn:'365d'})
// expiresIn thời gian token hết hạn
    return refresh_token
}

//refresh token
const refreshTokenJwtService = (token) =>{
    return new Promise((resolve,reject)=>{
        try{
            jwt.verify(token, 'refresh_token',async (err,user)=>{
                if(err){
                    resolve({
                        status: 'Error',
                        message:'The Authentication',
                    })
                }
                const access_token = await generalAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })
                console.log(access_token,"access_token")
                resolve({
                    status: 'Ok',
                    message:'Success',
                    access_token
                })
            })
        }catch(e){
            reject(e);
        }
    })
}
module.exports = {
    generalAccessToken,
    generalRefreshAccessToken,
    refreshTokenJwtService
}