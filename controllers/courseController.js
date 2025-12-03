const courseDal = require("../dal/courseDal")
const courseControler = new Object()

// ----------------------------create

courseControler.create = async(req,res)=>{
    try {
        let body = req?.body
        let create = await courseDal.create(body)
        if (create) {
            return {code:200, status:create.status, data:create.data, message:"created"}
        }
        return {code:400, status:false, data:null, message:"not created"}
    } catch (error) {
            return {code:500, status:false, data:error?error.message:"server error"}
    }
}

// ----------------------------get

courseControler.getCourse = async(req)=>{
    try {
        let result = await courseDal.getCourse(req.query)
        // console.log(result,"result")
        if (result) {
            return {code:200, status:result.status, data:result.data, message:result.message}
        }
        return {code:400, status:result.status, data:null, message:result.message}
    } catch (error) {
            return {code:500, status:result.status, data:error?error.message:"server error"}
    }
}

module.exports=courseControler