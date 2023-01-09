const mongoose=require("mongoose")

const DiseaseSchema=new mongoose.Schema({
    diseaseName:{
        type:String
    },
    diseaseScore:{
        type:String
    }
})
module.exports=new mongoose.model("DiseaseSchema",DiseaseSchema)