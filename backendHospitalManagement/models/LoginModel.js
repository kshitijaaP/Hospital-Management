const mongoose=require("mongoose")

const loginSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})
module.exports=new mongoose.model("loginSchema" ,loginSchema)