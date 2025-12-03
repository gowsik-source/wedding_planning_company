const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const courseSchema = new Schema({
    courseName:{type:String, default:null},
    courseFees:{type:Number, default:null},
    duration:{type:String, default:null},
    status:{type:Boolean, default:true},
    deleted:{type:Boolean, default:false}
},{timestamps:true})

const courseModel = new mongoose.model('courseDetail',courseSchema)

module.exports=courseModel