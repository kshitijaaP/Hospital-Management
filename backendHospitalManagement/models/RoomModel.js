const mongoose=require("mongoose")

const roomSchema=new mongoose.Schema({
    roomName:{
        type:String
    }
})
module.exports=new mongoose.model("roomSchema" ,roomSchema)