const jwt = require('jsonwebtoken')
const url = require('url')
const tokenHelper = require('../helper/tokenHelper')
const userModel = require('../models/userModel')
const allowedPath = require('../helper/allowedPath')

require('dotenv').config()
const secretKey = process.env.SECRETKEY

const authMiddleware = async (req, res, next) => {
    try {
        const pathName=url.parse(req.originalUrl).pathname
        console.log({pathName})
        if (allowedPath.includes(pathName)) {
            console.log("hhhhh")
            return next()
        }
        const authorization = req.headers.authorization
        if (!authorization) {
            return res.status(401).json({ status: false, message: "token missing in headers" })
        }
        const userId = req.headers["userid"] || req.headers["userId"]
        if (!userId) {
            return res.status(401).json({ status: false, message: "userId missing in headers" }) 
        }
        const token = authorization.split(" ")[1]
        
        const userData = await userModel.findById(userId)
        if (!userData) {
            return res.status(401).json({ status: false, message: "user not found" })
        }

        const decode = jwt.verify(token, secretKey)
        console.log({decode})
        if (!decode) {
            return res.status(401).json({ status: false, message: "token not valid" })
        }
        if (!decode.email) {
            return res.status(401).json({ status: false, message: "user data missing" })
        }
        // req.user = user
        next()
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ code: 401, status: false, message: "token expired, please login again" })
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(403).json({ code: 403, status: false, message: "invalid token" })

        }
        return res.status(500).json({ code: 500, status: false, message: "AuthMiddlewareError", data: error.message })
    }
}
module.exports = authMiddleware