import Navbar from "../Navbar/Navbar"
import HospitalManagementHeader from "../HospitalManagementHeader/HospitalManagementHeader"
import React from "react"
import axios from 'axios'
import { useState } from "react"
import { Button } from "bootstrap"
import { CSVLink } from "react-csv";
import { useRef } from 'react';
export default function Dashboard(){
  const [resPatient, setResPatient] = useState([])
  const [patientList, setpatientList] = useState(false)
  const [resRoom, setResRoom] = useState([])
  const [resPatientRoomData, setResPatientRoomData] = useState([])
  const [patientRoomList, setPatientRoomList] = useState(false)
  const [roomList, setroomList] = useState(false)
  const [start, setStart] = useState('new')
  const [patientRoomDetailData,setPatientRoomDetailData]=useState([])
  const[deleteDataObj,setDeleteDataObj]=useState([])
  const [roomAvailability,setRoomAvailability]=useState(false)
  const [data, setData] = useState([]);
  
    const [downloadedData, setDownloadedData] = useState([]);
    const csvDownloadRef = useRef(0);
  const win=window.sessionStorage
  React.useEffect(()=>{
 getPatientData()
    getRoomData()
    getPatientRoomData()
    
  },[start])
  const headers = [
    { label: "Patient Id", key: "_id" },
        { label: "Patient Name", key: "discharged_patientName" },
        { label: "Room Number", key: "discharged_roomNumber" },
        { label: "Disease", key: "discharged_patientDisease" },
        { label: "Severity", key: "discharged_patientDiseaseScore" },
       
  ];
  const fetchDataToDownload = () => {
    axios
      .get("http://localhost:5000/dischargepatietdata")
      .then(({data }) => {
        setDownloadedData(data);
        console.log(downloadedData)
        setTimeout(() => {
          csvDownloadRef.current.link.click();
        }, 500);
      })
      .catch((error) => 
      console.log(error)
      );
  };
  const dischargeButton=(e)=>{
    e.preventDefault()
    
    axios.post("http://localhost:5000/dischargepatient",deleteDataObj).then(res=>{
        console.log(res);
        if(res.data.message=== 'Deleted!')
        {
          getPatientRoomData()
         getRoomData()
        }
       })
}

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
    let patientDisease=patient.diseaseName
    let patientDiseaseScore=patient.diseaseScore

    let patientId=patient._id
    if( res.data.length>0)
    {
      let roomNumber=res.data[0].roomName 
      let roomId=res.data[0]._id
      patientRoomDetailData.push({patientName:patientName,roomNumber:roomNumber,roomId:roomId,patientId:patientId,patientDiseaseScore:patientDiseaseScore,patientDisease:patientDisease})
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
const handlePatientDischarge=(e)=>{
  let tempDeleteArray=deleteDataObj
     
        tempDeleteArray.push({_id:e._id})
        setDeleteDataObj(tempDeleteArray)
        console.log(deleteDataObj)
}
    return(
    <div>
       <HospitalManagementHeader showNavbar={false} >   </HospitalManagementHeader>
   
       
         <div>
         <div className="row "  >
          <div className="col col-lg-2">
            <Navbar/>
            <CSVLink
          headers={headers}
          data={downloadedData}
          filename="parents.csv"
          className="hidden"
          ref={csvDownloadRef}
          target="_blank"
        /> 
        <button
          className="btn btn-primary mb-2"
          onClick={fetchDataToDownload}
          style={{ marginLeft: "5px" }}
        >
          Discharge Patient Data
        </button>
            {/* <button class="btn btn-primary">Discharge Patient Data</button> */}
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
                      <th style={{ width: '40%' }} >Disease</th>
                      <th style={{ width: '40%' }} >Score</th>
                      <th style={{ width: '20%' }} >Room</th>
                      <th style={{ width: '20%' }} >Discharge</th>
                    
                  </tr>
                  {patientRoomList && resPatientRoomData.map(((patientRoom,index) => {
                      return (

                          <tr>
                              <td style={{ width: '10%' }}>{index+1}</td>
                              <td style={{ width: '40%',textAlign:'center' }} className="diseaseScoreStyle" > {patientRoom.patientName}</td>
                              <td style={{ width: '50%',textAlign:'center' }} className="diseaseScoreStyle" > {patientRoom.patientDisease}</td>
                              <td style={{ width: '40%',textAlign:'center' }} className="diseaseScoreStyle" > {patientRoom.patientDiseaseScore}</td>
                              
                              <td style={{ width: '40%',textAlign:'center' }} className="diseaseScoreStyle" > {patientRoom.roomNumber}</td>
                              <td style={{ width: '40%' }} ><input  class="form-check-input" onChange={()=>handlePatientDischarge(patientRoom)} type="checkbox" id="check1" name="option1" value="something"></input></td>
                         
                          </tr>
                      )

                  }))}
              </table>
             
              <button onClick={dischargeButton} class="btn btn-danger mt-2">Discharge Patient</button>
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