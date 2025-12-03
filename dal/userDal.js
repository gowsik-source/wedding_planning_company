const courseModel = require("../models/courseModel")
const userModel = require("../models/userModel")
const userDal = new Object()

// ---------------------------create

userDal.create = async (data) => {
    try {
        let payload = new userModel(data)
        let user = await payload.save()
        // console.log(user,"user data")
        if (user) {
            return { status: true, message: "user created", data: user }
        }
        return { status: false, message: "Failed....", data: {} }
    }
    catch (err) {
        return { status: false, message: err.message, data: {} }
    }
}

// ---------------------------------email check

userDal.emailCheck = async (email) => {
    try {
        let query = [{ deleted: false }, { email: email }]
        let result = await userModel.find({ $and: query })
        console.log(result, "email [find()] so multiple data")
        // here result's length is more than 0
        if (result.length > 0) {
            return { status: true, message: "email success", data: result[0] }
            // result[0] means always return first data
        }
        return { status: false, message: "email is already exists", data: null }
    }

    catch (err) {
        return { status: false, message: err.message, data: {} }
    }
}

// --------------------------get user (first name)

userDal.user = async (req) => {
    try {
        let query = [{ deleted: false }]
        if (req.firstName) {
            query.push({ firstName: req.firstName })
        }
        console.log(query)
        let result = await userModel.aggregate()
            .match({ $and: query })
            .sort({ createdAt: -1 })
            .exec()
        if (result) {
            return { status: true, message: "user Fetch successfully", data: result }
        }
        return { status: false, message: "failed", data: {} }
    }
    catch (err) {
        return { status: false, message: err.message, data: {} }
    }
}

module.exports = userDal