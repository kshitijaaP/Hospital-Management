import React, { useState } from 'react'
import axios from 'axios'
import './AddDisease.css'
export default function AddDisease() {
    const [inputSystemSetting, setInputSystemSettingUser] = useState({ diseaseName: '', diseaseScore: '' })
    const [resDisease, setResDisease] = useState([])
    const [diseaseList, setdiseaseList] = useState(false)
    const [start, setStart] = useState('new')
    const[deleteDataObj,setDeleteDataObj]=useState([])
    React.useEffect(() => {
        const timer = setTimeout(() => {
            loaddata();
          }, 100);
          return () => clearTimeout(timer);
    }, [start])
    const handleDeleteData=(e)=>{
        let tempDeleteArray=deleteDataObj
     
        tempDeleteArray.push({_id:e._id})
        setDeleteDataObj(tempDeleteArray)
        console.log(deleteDataObj)

    }
    const deleteDiseaseButton=(e)=>{
        e.preventDefault()
        
        axios.post("http://localhost:5000/deleteDisease",deleteDataObj).then(res=>{
            console.log(res);
            if(res.data.message=== 'Deleted!')
            {
                loaddata()
            }
           })
    }
    const handleSystemSettingInput = (e) => {
        e.preventDefault();
        const { name, value } = e.target
        setInputSystemSettingUser({ ...inputSystemSetting, [name]: value })
    }
    const loaddata = () => {
        axios.get('http://localhost:5000/SystemSettingDisease').then(res => {
            let templist = [];
            templist = res.data.data;
            const { diseaseName, diseaseScore, _id } = res.data.data;
            // templist.push({ diseaseName: diseaseName, diseaseScore: diseaseScore });
            setResDisease(templist)
            setdiseaseList(true)
            let temp = _id
            setStart(temp)
        })
    }
    const onSubmitDisease = (e) => {
        e.preventDefault();
        const { diseaseName, diseaseScore } = inputSystemSetting;
        if (diseaseName) {
            axios.post('http://localhost:5000/SystemSettingDisease', inputSystemSetting).then(res => {
                if (res.data.data) {
                    loaddata();

                }
            })
        }
    }
    return (
        <div>

            <div className="SystemSettingContainer">
                
            <p className='paraDiseaseAdd'>Add new disease in the system</p>
                <form>
                    <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-3 col-label mt-1" style={{fontWeight:'bold',fontSize:'15px'}}>Disease Name</label>
                        <div class="col-sm-9" style={{border:'none'}}>
                            {/* <input type="email" id="inputEmail3" placeholder="Email"></input> */}
                            <input  onChange={handleSystemSettingInput}  class="form-control" name='diseaseName' type="text" placeholder='Enter new disease name' value={inputSystemSetting.diseaseName}></input>
              
                        </div>
                    </div>
                    {/* <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-3 col-form-label mt-3" style={{fontWeight:'bold',fontSize:'15px'}}>Disease Score</label>
                        <div class="col-sm-9 mt-3" style={{border:'none'}}>
                        <input  pattern="[0-5]" maxLength="1" onChange={handleSystemSettingInput} class="form-control" name='diseaseScore' type="text" placeholder='Enter new disease score' value={inputSystemSetting.diseaseScore}></input>
                    </div>
                    </div> */}


                    <div class="form-group row">
                        <div class="col-sm-10" style={{border:'none'}}>
                            <button type="submit" onClick={onSubmitDisease} class="btn btn-primary mt-2">Add Disease</button>
                        </div>
                    </div>
                </form>
            </div>
            <hr></hr>
            <div className="table-bordered table-responsive text-center" >
                <p className='paraDiseaseDelete'>Delete diseases from system</p>
                <table class="table table-bordered" style={{border:'1px solid orange'}}>
                    <tr>
                        <th style={{ width: '40%' }}>Name</th>
                        {/* <th style={{ width: '40%' }} >Score</th> */}
                        <th style={{ width: '40%' }} >Select</th>
                    </tr>
                    {diseaseList && resDisease.map((disease => {
                        return (

                            <tr>
                                <td style={{ width: '40%' }} className="diseaseNameStyle">{disease.diseaseName}</td>
                                {/* <td style={{ width: '40%' }} className="diseaseScoreStyle" >{disease.diseaseScore}</td> */}
                                <td style={{ width: '40%' }} ><input class="form-check-input" onChange={()=>handleDeleteData(disease)}  type="checkbox" id="check1" name="option1" value="something"></input></td>
                            </tr>
                        )

                    }))}
                </table>
                <button class="btn btn-danger mt-2" onClick={deleteDiseaseButton}>Delete diseases</button>
            </div>

        </div>
    )
}