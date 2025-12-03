const userDal = require("../dal/userDal")
const userModel = require("../models/userModel")
const bcrypt = require("bcrypt") // for password hashing
const mailHelper = require("../helper/mailHelper")
const template = require("../templates/userTemplate")
const helper = require("../helper/helper")
const courseDal = require("../dal/courseDal")
const userControler = new Object()

// ---------------------------------create and email check

userControler.create = async (req, res) => {
    try {
        let body = req?.body
        // let localBody = { ...body } 
        // spread operator (Copying all values, Unpacking the data, Cloning an object or array) to copy (body) data

        // for email exists check
        if (body?.email) {
            let emailCheck = await userModel.findOne({ email: body?.email })
            console.log(emailCheck, "email found")
            if (emailCheck) {
                return { code: 400, status: false, data: null, message: "email is already exists" }
            }
        }

        //password hashing
        let salt = await bcrypt.genSalt(10)
        let passwordHash = await bcrypt.hash(body.password, salt)
        console.log(passwordHash, "password hash")
        body['password'] = passwordHash

        // let courseId = await courseDal.findById(req.body.courseId)
        // console.log(courseId, "courseId")
        // let courseFees  = courseId.data.totalFees-req.body.discount

        //create user
        // body['totalFees'] = courseId.data.courseFees - req.body.discount
        let create = await userDal.create(body)
        console.log(create, "user created")
        if (create) {
            // send email to user
            // let password = await helper.generate(4)
            // let data = {
            //     firstName: create.data.firstName,
            //     secondName: create.data.secondName,
            //     password : password
            // }
            // let templates = await template.registration(data)
            // let email = await mailHelper.sendMail(create.data.email, "Registration Successfull", templates)

            // if (email) {
            //     console.log("success")
            // }

            return { code: 200, status: create.status, data: create.data, message: "created" }
        }
        return { code: 400, status: false, data: null, message: "not created" }
    } catch (error) {
        return { code: 500, status: false, data: error ? error.message : "server error" }
    }
}

// ---------------------------------get

userControler.user = async (req) => {
    try {
        let result = await userDal.getuser(req.query)
        if (result) {
            return { code: 200, status: result.status, data: result.data, message: result.message }
        }
        return { code: 400, status: result.status, data: null, message: result.message }
    }
    catch (error) {
        return { code: 500, status: false, data: error ? error.message : "server error" }
    }
}

// -----------------------------------login

userControler.login = async (req) => {
    try {
        let body = req?.body

        // required fields check
        if (!body.email) {
            return { code: 400, status: false, message: "enter the email", data: null }
        }
        if (!body.password) {
            return { code: 400, status: false, message: "enter the password", data: null }
        }

        // to check email is found on database
        let user = await userDal.emailCheck(body.email)
        console.log(user, "user")
        if (!user.data) {
            return { code: 400, status: false, message: "Email not found", data: null }
        }

        // password verification using bcrypt.compare()
        if (!user.data.password) {
      return { code: 500, status: false, message: "Password missing in database", data: null };
    }
        let validPassword = await bcrypt.compare(body.password, user.data.password)
        if (validPassword) {
            return { code: 200, status: true, message: "login success", data: user.data }
        }
        return { code: 400, status: false, message: "incorrect password", data: null }
    }
    catch (error) {
        return { code: 500, status: false, data: error ? error.message : "server error" }
    }
}

// ------------------------------------forget password

userControler.forgotPassword = async (req) => {
    try {
        let body = req?.body
        // if new password field is empty
        if (!body.password) {
            return { code: 400, status: false, data: null, message: "enter the new password" }
        }
        // to check email is found on database
        let emailCheck = await userDal.emailCheck(body.email)
        console.log(emailCheck, "email found")
        //update password
        if (emailCheck) {
            let salt = await bcrypt.genSalt(10)
            let createPassword = await bcrypt.hash(body.password, salt)
            console.log(createPassword, "hash password")
            body['password'] = createPassword

            let updatePassword = await userModel.findByIdAndUpdate(emailCheck.data._id, { password: createPassword }, { new: true })
            if (updatePassword) {
                return { code: 200, status: true, data: updatePassword, message: "password changed" }
            }
            return { code: 400, status: false, data: null, message: "Enter the password" }
        }
    } catch (error) {
        return { code: 500, status: false, data: error ? error.message : "server error" }
    }
}

module.exports = userControler