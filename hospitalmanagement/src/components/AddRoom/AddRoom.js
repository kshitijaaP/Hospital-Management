import React, { useState } from "react"
import axios from 'axios'
import './AddRoom.css'
export default function AddRoom() {
    const [room, setRoom] = useState({ roomName: '' })
    const [resRoom, setResRoom] = useState([])
    const [roomList, setRoomList] = useState(false)
    const[deleteDataObj,setDeleteDataObj]=useState([])
    const [start, setStart] = useState('new')
    const deleteRoomButton=(e)=>{
        e.preventDefault()
        
        axios.post("http://localhost:5000/deleteRoom",deleteDataObj).then(res=>{
            console.log(res);
            if(res.data.message=== 'Deleted!')
            {
                loaddata()
            }
           })
    }

    React.useEffect(() => {
        
        const timer = setTimeout(() => {
            loaddata();
          }, 100);
          return () => clearTimeout(timer);
    }, [start])
    const handleInputRoom = (e) => {
       
        const {name,value}=e.target
        setRoom({ ...room, [name]: value })
       

    }
    const handleDeleteData=(e)=>{
        let tempDeleteArray=deleteDataObj
     
        tempDeleteArray.push({_id:e._id})
        setDeleteDataObj(tempDeleteArray)
        console.log(deleteDataObj)

    }
    const submitRoom = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/SystemSettingRoom", room).then(res => {
            loaddata();
        })
    }
    const loaddata = () => {
        axios.get('http://localhost:5000/SystemSettingRoom').then(res => {
            let templist = [];
            templist = res.data.data;
            
            const { roomName, _id } = res.data.data;
            // templist.push({ diseaseName: diseaseName, diseaseScore: diseaseScore });
            setResRoom(templist)
            setRoomList(true)
            let temp = _id
            setStart(temp)
        })
    }
    
    return (
        <div>
            <div className="containerRoom">
                <p className="paraAddRoom">
                    Add new room in the system
                </p>
                <form>
                    <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-3 col-label mt-1"style={{fontWeight:'bold',fontSize:'15px'}}>Room Name</label>
                        <div class="col-sm-9" style={{border:'none'}}>
                            <input onChange={handleInputRoom} class="form-control" name="roomName" value={room.roomName} placeholder="Enter new room name :" type="text"></input>
                        </div>
                    </div>

                    <div class="form-group row">
                        
                        <div class="col-sm-10" style={{border:'none'}}>

                            <button type="submit" onClick={submitRoom} class="btn btn-primary mt-2">Add Rooms</button>
                        </div>
                    </div>
                </form>
                
                <hr></hr>
            </div>
            <div className="table-bordered table-responsive text-center">
                <p className="paraDeleteRoom">Delete room from system</p>
                <table class="table table-bordered" style={{border:'1px solid orange'}}>
                    <tr>
                        <th style={{ width: '40%' }}>Room</th>

                        <th style={{ width: '40%' }} >Select</th>
                    </tr>
                    {roomList && resRoom.map((room => {
                        return (

                            <tr>
                                <td style={{ width: '40%' }} className="diseaseNameStyle">{room.roomName}</td>

                                <td style={{ width: '40%' }} ><input  class="form-check-input" onChange={()=>handleDeleteData(room)} type="checkbox" id="check1" name="option1" value="something"></input></td>
                            </tr>
                        )

                    }))}
                </table>

                <button onClick={deleteRoomButton} class="btn btn-danger mt-2">Delete rooms</button>
            </div>
        </div>
    )
}