const express = require("express")
const courseControler = require("../controllers/courseController")
const courseRoute = express.Router()

// ---------------------------create

courseRoute.post("/create",async(req,res)=>{
    let result = await courseControler.create(req)
    res.status(result.code).send(result)
})

// ----------------------------get

courseRoute.get("/get",async(req,res)=>{
    let result = await courseControler.getCourse(req)
    res.status(result.code).send(result)
})

module.exports=courseRoute