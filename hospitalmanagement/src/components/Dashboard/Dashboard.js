import Navbar from "../Navbar/Navbar"
import HospitalManagementHeader from "../HospitalManagementHeader/HospitalManagementHeader"
import React from "react"
import axios from 'axios'
import { useState } from "react"
export default function Dashboard(){
  const [resPatient, setResPatient] = useState([])
  const [patientList, setpatientList] = useState(false)
  const [resRoom, setResRoom] = useState([])
  const [resPatientRoomData, setResPatientRoomData] = useState([])
  const [patientRoomList, setPatientRoomList] = useState(false)
  const [roomList, setroomList] = useState(false)
  const [start, setStart] = useState('new')
  const [patientRoomDetailData,setPatientRoomDetailData]=useState([])

  const [roomAvailability,setRoomAvailability]=useState(false)
  const win=window.sessionStorage
  React.useEffect(()=>{
    // const timer = setTimeout(() => {
    //   getPatientData()
    //   getRoomData()
    //   getPatientRoomData()
  
    // });
    // return () => clearTimeout(timer);
 getPatientData()
    getRoomData()
    getPatientRoomData()
    
  },[start])
  const getPatientData=async()=>{
  await axios.get("http://localhost:5000/addpatient").then(res=>{
    if (res.data.data.length>0)
    {
      win.setItem('PatientCount',res.data.data.length)
    }
    else{
      win.setItem('PatientCount',0)
    }
        
     
        let templist = [];
        templist = res.data.data;
        setResPatient(templist)
        setpatientList(true)
    })
}
const getRoomData = async() => {
  await axios.get('http://localhost:5000/SystemSettingRoom').then(res => {
    
      if (res.data.data.length>0)
      {
        win.setItem('RoomCount',res.data.data.length)
      }
      else{
        win.setItem('RoomCount',0)
      }
      let temproomList = [];
      temproomList = res.data.data;
      setResRoom(temproomList)
      setroomList(true)   
  })
} 
const getPatientRoom=async(patient)=>{
await axios.get('http://localhost:5000/getPatientRoom').then(res => {
    console.log("aat aala")
  
    let patientName=patient.fname+ patient.lname
    let patientId=patient._id
    if( res.data.length>0)
    {
      let roomNumber=res.data[0].roomName 
      let roomId=res.data[0]._id
      patientRoomDetailData.push({patientName:patientName,roomNumber:roomNumber,roomId:roomId,patientId:patientId})
    }
    else{
      setRoomAvailability(true)
         
      getRoomData()
      getPatientData()
      getPatientRoomData()
      // alert("Kindly Check the Room Availability")

    }
 
   
      
    console.log(patientRoomDetailData)
    // setPatientRoomDetailData(patientTempRoom)    
  })
}
const addPatientRoom=async(patient)=>{
await getPatientRoom(patient)
  console.log(patientRoomDetailData)
  if (patientRoomDetailData.length>0)
  {
    axios.post('http://localhost:5000/addPatientRoom',patientRoomDetailData).then(res=>{
      console.log(res)
      
      getRoomData()
      getPatientData()
      getPatientRoomData()
    })
  }

}
const getPatientRoomData=async()=>{
 await axios.get('http://localhost:5000/addPatientRoom').then(res=>{
    let temproomPatientList = [];
    temproomPatientList = res.data.data;
    if(res.data.data.length>0)
    {
      win.setItem('PatientWithRoomCount',res.data.data.length)
    }
    else{
      win.setItem('PatientWithRoomCount',0)
    }
  
    setResPatientRoomData(temproomPatientList)
    setPatientRoomList(true)
  })
}
    return(
    <div>
       <HospitalManagementHeader showNavbar={false} >   </HospitalManagementHeader>
   
       
         <div>
         <div className="row "  >
          <div className="col col-lg-2">
            <Navbar/>
          </div>
          <div  className="col col-lg-3 mt-2" style={{ backgroundColor:'#317bb8' ,color:'white',marginLeft:'11px',marginRight:'53px',width:'25.5%',height:'30%'}} >
          <p>Patients with rooms :</p>          
          <p>{win.getItem('PatientWithRoomCount')}</p>
          </div>
          <div className="col col-lg-3 mt-2" style={{ backgroundColor:'#da544b',color:'white',marginRight:'53px',width:'25.5%' ,height:'25%'}} >
          <p>Patient waiting :</p>
          <p>{win.getItem('PatientCount')}</p>
          </div>
          <div className="col col-lg-3 mt-2" style={{ backgroundColor:'#e59204',color:'white',width:'25.5%',height:'25%' }} >
          <p>Rooms : </p>
          <p>{win.getItem('RoomCount')}</p>
          </div>
          {roomAvailability && <h5 style={{marginLeft:'323px',marginTop:'-797px',color:'red'}}>Kindly Check Room Availability</h5>}
          </div>
      
        <div className="row mt-0">
          <div className="col col-lg-2"></div>
         
          <div className="col col-lg-4">
         
          <div className="table-bordered table-responsive text-center" style={{marginTop:'-782px'}}>
              
              <table class="table table-bordered mt-5" style={{border:'1px solid orange'}}>
                  <tr>
                      <th style={{ width: '20%' }}>Sr No:</th>
                      <th style={{ width: '40%' }} >Patient With Rooms</th>
                      <th style={{ width: '40%' }} >Room</th>
                    
                  </tr>
                  {patientRoomList && resPatientRoomData.map(((patientRoom,index) => {
                      return (

                          <tr>
                              <td style={{ width: '20%' }}>{index+1}</td>
                              <td style={{ width: '40%',textAlign:'center' }} className="diseaseScoreStyle" > {patientRoom.patientName}</td>
                              <td style={{ width: '40%',textAlign:'center' }} className="diseaseScoreStyle" > {patientRoom.roomNumber}</td>
                             
                          </tr>
                      )

                  }))}
              </table>
             
          </div>
          </div>
          <div className="col col-lg-4">
         
          <div className="table-bordered table-responsive text-center" style={{marginTop:'-782px'}}>
              
                <table class="table table-bordered mt-5" style={{border:'1px solid orange'}}>
                    <tr>
                        <th style={{ width: '20%' }}>Sr No</th>
                        <th style={{ width: '40%' }} >Patient waiting</th>
                        <th style={{ width: '40%' }} >Score</th>
                    </tr>
                    {patientList && resPatient.map(((patient,index) => {
                        return (

                            <tr>
                         
                                <td style={{ width: '20%' }}>{index+1}</td>
                                <td style={{ width: '40%' }} className="diseaseScoreStyle" >
                                   
                                   <a onClick={()=>{addPatientRoom(patient)}} href="#">{patient.fname} {patient.lname}</a>
                                   </td>
                                <td style={{ width: '40%' }} > {patient.diseaseScore}</td>
                            </tr>
                        )

                    }))}
                </table>
               
            </div>
          </div>
          <div className="col col-lg-2">
          <div className="table-bordered table-responsive text-center" style={{marginTop:'-733px'}}>
              
                <table class="table table-bordered" style={{border:'1px solid orange'}}>
                    <tr>
                        <th style={{ width: '20%' }}>Sr No</th>
                        <th style={{ width: '40%' }} >Free Rooms</th>
                      
                    </tr>
                    {roomList && resRoom.map(((room ,index)=> {
                        return (

                            <tr>
                                <td style={{ width: '20%' }} className="diseaseNameStyle">{index+1}</td>
                                <td style={{ width: '40%',textAlign:'center' }} className="diseaseScoreStyle" > {room.roomName}</td>
                               
                            </tr>
                        )

                    }))}
                </table>
               
            </div>
          </div>
        </div>
      </div>
    
    </div>)
}