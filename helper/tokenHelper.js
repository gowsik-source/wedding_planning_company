const jwtToken = require ('jsonwebtoken');
tokenHelper = new Object();

tokenHelper.generateToken = (email,secretKey)=>{
    const accesToken = jwtToken.sign({email},secretKey,{expiresIn:"60s"})
    return accesToken
}
tokenHelper.verifyToken = (token,secretKey)=>{
    try {
        const decode= jwtToken.verify(token,secretKey)
        return decode
    } catch (error) {
        null
    }
}

tokenHelper.decode= (token)=>{
    try {
        const decode = jwtToken.decode(token)
        return decode
    } catch (error) {
        console.log("decode error")
    }
}

module.exports = tokenHelper