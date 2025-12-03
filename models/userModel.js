const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const userSchema = new Schema({
    // userID:{type:Schema.Types.ObjectId, default:null},
    // courseId:{type:Schema.Types.ObjectId, default:null},
    firstName:{type:String, default:null},
    secondName:{type:String, default:null},
    email:{type:String, default:null},
    password:{type:String, default:null},
    // contactNo:{type:Number, default:null},
    // discount:{type:Number, default:null},
    // totalFees:{type:Number, default:null},
    // startingDate:{type:Date, default:null},
    // endingDate:{type:Date, default:null},
    status:{type:Boolean, default:false},
    deleted:{type:Boolean, default:false}
},{timestamps:true})

const userModel = new mongoose.model('userDetail',userSchema)

module.exports=userModel