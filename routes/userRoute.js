const express = require("express")
const userControler = require("../controllers/userController")
const userRoute = express.Router()

// ---------------------------create

userRoute.post("/create",async(req,res)=>{
    let result = await userControler.create(req)
    res.status(result.code).send(result)
})

// ------------------------------get

userRoute.get("/get",async(req,res)=>{
    let result = await userControler.user(req)
    res.status(result.code).send(result)
})

// ---------------------------------login

userRoute.post("/login", async(req,res)=>{
    let result = await userControler.login(req)
    res.status(result.code).send(result)
})

// ---------------------------------forgot password

userRoute.put("/forgotPassword/:id",async(req,res)=>{
    let result = await userControler.forgotPassword(req)
    res.status(result.code).send(result)
})

module.exports=userRoute