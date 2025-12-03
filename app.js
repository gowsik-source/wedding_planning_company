const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const port = 3800
require("dotenv").config()
const mongodbUrl = process.env.MONGODB_URI

const userRoute = require("./routes/userRoute")
const courseRoute = require("./routes/courseRoute")

const corsOptions = {
    origin:"*",
    Credentials:true,
    OptionSuccessStatus:200
}

app.use(express.json())
app.use(bodyParser.json())
app.use(morgan("dev"))
app.use(cors(corsOptions))

app.use("/user",userRoute)
app.use("/course",courseRoute)

mongoose.connect(mongodbUrl)
.then(()=>console.log("db connected"))
.catch(()=>console.log("db failed"))

app.listen(port,()=>{console.log(`connected in ${port}`)})