const mongoose=require("mongoose")

const DischargePatientSchema=new mongoose.Schema({
    discharged_patientName:{
        type:String,
    },
    discharged_roomNumber:{
        type:String,
    },
    discharged_roomId:{
        type:String,
    },
    discharged_patientId:{
        type:String
    },
    discharged_patientDiseaseScore:{
        type:String
    },
    discharged_patientDisease:{
        type:String
    }

    
})
module.exports=new mongoose.model("DischargePatientSchema",DischargePatientSchema)