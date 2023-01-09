const mongoose=require("mongoose")

const PatientRoomSchema=new mongoose.Schema({
    patientName:{
        type:String,
    },
    roomNumber:{
        type:String,
    },
    roomId:{
        type:String,
    },
    patientId:{
        type:String
    }

    
})
module.exports=new mongoose.model("PatientRoomSchema",PatientRoomSchema)