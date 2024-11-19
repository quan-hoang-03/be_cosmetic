const jwt = require('jsonwebtoken')

const generalAccessToken = async (payload) =>{
    console.log('payload',payload)
    const access_token = jwt.sign({
        payload 
    },'access_token',{expiresIn:'1h'})
// expiresIn thời gian token hết hạn
    return access_token
}
const generalRefreshAccessToken = async (payload) =>{
    console.log('payload',payload)
    const refresh_token = jwt.sign({
        payload 
    },'refresh_token',{expiresIn:'365d'})
// expiresIn thời gian token hết hạn
    return refresh_token
}

module.exports = {
    generalAccessToken,
    generalRefreshAccessToken
}