const mongoose =require("mongoose")

const RegisterSchema=new mongoose.Schema({
    fname:{
        type:String,
        require:true
    },  lname:{
        type:String,
        require:true
    }
    ,  email:{
        type:String,
        require:true
    }
    ,  password:{
        type:String,
        require:true
    }
    ,  confirmpassword:{
        type:String,
        require:true
    }
})
module.exports=new mongoose.model("RegisterSchema",RegisterSchema)