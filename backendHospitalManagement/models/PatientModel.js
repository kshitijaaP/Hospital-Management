const mongoose=require("mongoose")

const PatientSchema=new mongoose.Schema({
    fname:{
        type:String,
    },
    lname:{
        type:String,
    },
    dob:{
        type:String,
    },
    sex:{
        type:String,
    },
    diseaseName:{
        type:String,
    },
    diseaseScore:{
        type:String,
    }

    
})
module.exports=new mongoose.model("PatientSchema",PatientSchema)