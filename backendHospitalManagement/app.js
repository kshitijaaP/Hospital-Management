const express=require("express")
const bodyparser=require("body-parser")
const DiseaseSchema=require("./models/DiseaseModel")
const roomSchema=require('./models/RoomModel')
const PatientSchema=require('./models/PatientModel')
const PatientRoomSchema=require('./models/PatientRoomModel')
const RegisterSchema=require("./models/RegisterModel")
const loginSchema=require("./models/LoginModel")
const DischargePatientSchema=require("./models/DischargePatientModel")
const app=express();
app.use(express.json())
const cors = require("cors");
const { default: mongoose } = require("mongoose");
app.use(cors())
app.use(bodyparser.urlencoded({extended:true}))
mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://root:root1234@cluster0.s3hneox.mongodb.net/test",{
  }).then()
  
app.post('/SystemSettingDisease',(req,res)=>
{
    const {diseaseName,diseaseScore}=req.body;
    const disease=new DiseaseSchema({diseaseName,diseaseScore})
    disease.save((err,data)=>
    {
        if (err) throw err
        else{
          res.send({data})
        }
    })
})
app.get('/SystemSettingDisease',(req,res)=>
{
    DiseaseSchema.find((err,data)=>
    {
        if (err) throw err;
        else
        {
            res.send({data})
        }
    })
})

app.post('/SystemSettingRoom',(req,res)=>
{
    const {roomName}=req.body;
    const roomDb=new roomSchema({roomName})
    roomDb.save((err,data)=>
    {
        if (err) throw err
        else{
          res.send({data})
        }
    })

})
app.get('/SystemSettingRoom',(req,res)=>{
     roomSchema.find((err,data)=>
    {
        if (err) throw err
        else{
          res.send({data})
        }
    })      
})
app.post("/addpatient",(req,res)=>{
    const {fname, lname, dob, sex, diseaseName, diseaseScore, checkboxDisease }=req.body;
    const patientData=new PatientSchema(
        {
            fname, lname, dob, sex, diseaseName, diseaseScore, checkboxDisease
        }
    )
    patientData.save((err,data)=>{
        if(err) throw err;
        else{
            res.send({data})
        }
    })
})
app.get("/addpatient",(req,res)=>
{
    PatientSchema.find((err,data)=>
    {
        if (err) throw err;
        else{
            res.send({data})
        }
    })
})
app.post("/deleteRoom",(req,res)=>{
 
    
    req.body.forEach(element => {
    
        let _id=element._id
        roomSchema.findOneAndDelete({_id:_id}).then(
            () => {
                
                res.status(200).json({
                    message: 'Deleted!'
                  });
            }
          ).catch(
            
            (error) => {
               
                res.status(400).json({
                    error: error
                  });
             
            }
            
            
          );
          
      });
   
})
app.get("/getPatientRoom",async (req,res)=>{
  
    roomSchema.find().sort( { "_id" : -1 } ).limit(1).exec(
        function (err, data) {
            if(err) {
               console.log(err)
            }
            else{
            
              // res.send({data});
              res.json(data)
            }
        
        
        })
})
app.post("/addPatientRoom",(req,res)=>{

    
    
    // let patientName=req.body[0].patientName
    // let roomNumber=req.body[0].roomNumber
    // let roomId=req.body[0].roomId
    // let patientId=req.body[0].patientId

    req.body.forEach(patientRoomRequest=>{
      
      const{ patientName,roomNumber,roomId,patientId,patientDiseaseScore,patientDisease}=patientRoomRequest
      const patientroom=new PatientRoomSchema({
        patientName,roomNumber,roomId,patientId,patientDiseaseScore,patientDisease
    })
    patientroom.save((err,data)=>{
        if(err) throw err;
        else{
            res.send({data})
            roomSchema.findOneAndDelete({_id:roomId}).then(()=>{
                console.log("Room Deleted")
            })
            PatientSchema.findOneAndDelete({_id:patientId}).then(()=>{
                console.log("Patient data deleted")
            })
        
        }
    })
    })
    
    
})
app.get("/addPatientRoom",(req,res)=>{
    PatientRoomSchema.find((err,data)=>{
        if (err) throw err
        else{

            res.send({data})
        }
    })
})
app.post("/register" ,(req,res)=>
{
  const {fname,lname,email,password,confirmpassword}=req.body;

  const registerUser=new RegisterSchema({
    fname,lname,email,password,confirmpassword
  })
  registerUser.save((err,data)=>
  {
    if (err) throw err
    else{
      res.send({data})
    }
  })
})

app.post("/login",(req,res)=>
{
  const {password,email}=req.body;
  RegisterSchema.findOne({email:email},(err,loginUser)=>
  {
    if (err) throw err
    if (loginUser==null)
    {
     
      res.send({message : "Please register first"})
    }
    else{
      if(loginUser && (password===loginUser.password) && (email===loginUser.email) )
    {
      res.send({message : "Success"})
    }
    if(password!==loginUser.password)
    {
      res.send({message : "Password Incorrect"})
    }
    }
  
    
    
  })

})
app.post("/deleteDisease",(req,res)=>{
 
    
  req.body.forEach(element => {
  
      let _id=element._id
      DiseaseSchema.findOneAndDelete({_id:_id}).then(
          () => {
              res.send({  message: 'Deleted!'})
             
          }
        ).catch(
          
          (error) => {
             
            res.send({ error})
           
          }
          
          
        );
        
    });
 
})
app.post("/dischargepatient",(req,res)=>{
 
    
  req.body.forEach( element => {
  
      let _id=element._id
      PatientRoomSchema.findOne({_id:_id},(err,patientRoomData)=>{
        console.log(patientRoomData)
      const roomName=patientRoomData.roomNumber
        const saveRoom=new roomSchema({roomName})
        saveRoom.save((err,data)=>{
          if (err) throw err
        else{
          // res.send({data})
        }        
      })
      console.log(patientRoomData)
      const discharged_patientName=patientRoomData.patientName
      const discharged_roomNumber=patientRoomData.roomNumber
      const discharged_roomId=patientRoomData.roomId
      const discharged_patientId=patientRoomData.patientId
      const discharged_patientDiseaseScore=patientRoomData.patientDiseaseScore
      const discharged_patientDisease=patientRoomData.patientDisease
      // const{ discharged_patientName,discharged_roomNumber,discharged_roomId,discharged_patientId,discharged_patientDiseaseScore,discharged_patientDisease}=patientRoomData
        const dischargePatientSave= new DischargePatientSchema(
          {
            discharged_patientName,discharged_roomNumber,discharged_roomId,discharged_patientId,discharged_patientDiseaseScore,discharged_patientDisease
          }
        )
        dischargePatientSave.save((err,data)=>{
        if (err) throw err
        else{
          // res.send({data})
          console.log(data)
        }

        })
        const patiendName=patientRoomData.patiendName;

      })

     PatientRoomSchema.findOneAndDelete({_id:_id}).then(
          () => {
              
              res.status(200).json({
                  message: 'Deleted!'
                });
          }
        ).catch(
          
          (error) => {
             
              res.status(400).json({
                  error: error
                });
           
          }
          
          
        );
        
    });
 
})
app.get("/dischargepatietdata",(req,res)=>{
  DischargePatientSchema.find((err,data)=>{
    if (err) throw err
    else
    {
    
      res.send(data)
    }
   
  })
})
app.listen(5000)