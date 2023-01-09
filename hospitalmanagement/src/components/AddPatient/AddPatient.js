import HospitalManagementHeader from "../HospitalManagementHeader/HospitalManagementHeader";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";
import axios from 'axios'
import "./AddPatient.css"
import React from "react";
export default function AddPatient() {
    const [resDisease, setResDisease] = useState([])
    const [diseaseList, setdiseaseList] = useState(false)
    const [start, setStart] = useState('new')
    const [addPatient, setAddPatient] = useState({ fname: '', lname: '', dob: '', sex: '', diseaseName: '', diseaseScore: '', checkboxDisease: false })

    React.useEffect(() => {
        const timer = setTimeout(() => {
            loaddata();
        }, 100);
        return () => clearTimeout(timer);

    }, [start])
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
    const handleAddPatientInput = (e) => {
        let tempAddPatient = [];
        // const { name, value, checked } = e.target; 
        let name = "";
        let value = "";
        if (e.target) {
            name = e.target.name;
            value = e.target.value
        }
        if (e.diseaseName) {

            value = e.diseaseName;
            name = "diseaseName";
        }
        if (e.diseaseScore && addPatient.diseaseName !== '') {

            value = e.diseaseScore;
            name = "diseaseScore";
        }
        setAddPatient({ ...addPatient, [name]: value })

    }

    const submitAddPatient = (e) => {
        e.preventDefault();

        axios.post("http://localhost:5000/addpatient", addPatient).then(res => {
            console.log(res.data)
            // getPatientData()
            addPatient.fname = '';
            addPatient.lname = '';
            addPatient.dob = '';
            addPatient.sex = '';
            addPatient.diseaseName = '';
            addPatient.diseaseScore = '';
            alert("Patient details saved")


        })
    }
    const getPatientData = () => {
        axios.get("http://localhost:5000/addpatient").then(res => {
            console.log(res.data)

        })
    }
    const ClearInputFields = () => {
        // fname: '', lname: '', dob: '', sex: '', diseaseName: '', diseaseScore: '', checkboxDisease: false 
        addPatient.fname = '';
        addPatient.lname = '';
        addPatient.dob = '';
        addPatient.sex = '';
        addPatient.diseaseName = '';
        addPatient.diseaseScore = '';
        // addPatient.checkboxDisease=''
    }
    return (
        <div className="Navbar">
            <HospitalManagementHeader showNavbar={false} >   </HospitalManagementHeader>

            <div >
                <div className="row">

                    <div className="col col-lg-2">

                        <Navbar />

                    </div>
                    <div className="col col-lg-6">
                        <div class="container" style={{ backgroundColor: 'yellow', color: 'black' }}>
                            <h5>Note</h5>
                            <p style={{ fontWeight: 'bold' }}>Disease Score: 0-2 :Low,  3 :Medium ,4-5:High </p>
                            <p></p>

                        </div>
                        <h2 className='AddPaientHeader'>Add Patient</h2>

                        <hr></hr>
                        <form class="mt-5">
                            <div className="form-group row">
                                <label className="col col-sm-3" style={{ fontWeight: 'bold', fontSize: '20px', border: 'none' }} >First Name</label>
                                <div className="col col-sm-9 " style={{ border: 'none' }}>
                                    <input type="text" style={{ width: '58%', height: '35px' }} name="fname" onChange={handleAddPatientInput} value={addPatient.fname} placeholder="Enter your first name :"></input>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col col-sm-3 mt-3" style={{ fontWeight: 'bold', fontSize: '20px', border: 'none' }}>Last Name</label>
                                <div className="col col-sm-9 mt-3" style={{ border: 'none' }}>
                                    <input type="text" name="lname" style={{ width: '58%', height: '35px' }} value={addPatient.lname} onChange={handleAddPatientInput} placeholder="Enter your last name :"></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col col-sm-3 mt-3" style={{ fontWeight: 'bold', fontSize: '20px', border: 'none' }}>Date of Birth</label>
                                <div className="col col-sm-9 mt-3" style={{ border: 'none' }}>
                                    <input type="date" name="dob" style={{ width: '58%', height: '35px' }} value={addPatient.dob} onChange={handleAddPatientInput} placeholder="Enter your Date Of Birth :"></input>
                                </div>
                            </div>
                            <div className="form-group row">

                                <label className="col col-sm-3 mt-3" style={{ fontWeight: 'bold', fontSize: '20px', border: 'none' }}>Sex</label>
                                <div className="col col-sm-9 mt-3" onChange={handleAddPatientInput} style={{ border: 'none' }}>
                                    <input style={{ width: '5%', height: '20px' }} type="radio" value="MALE" name="sex" defaultChecked={addPatient.sex === "MALE"} /> Male
                                    <input style={{ width: '5%', height: '20px' }} type="radio" value="FEMALE" name="sex" defaultChecked={addPatient.sex === "FEMALE"} /> Female
                                    <input style={{ width: '5%', height: '20px' }} type="radio" value="TRANSGENDER" name="sex" defaultChecked={addPatient.sex === "TRANSGENDER"} /> Transgender

                                    {/* <input type="text" name="sex" value={addPatient.sex} onChange={handleAddPatientInput} placeholder="Enter your sex :"></input> */}
                                </div>
                            </div>
                            <div className="form-group row">

                                <label className="col col-sm-3 mt-3" style={{ fontWeight: 'bold', fontSize: '20px', border: 'none' }}>Severity</label>
                                <div className="col col-sm-9 mt-3" style={{ border: 'none' }}>
                                    <select style={{ width: '58%', height: '35px' }} value={addPatient.diseaseScore} name="diseaseScore" onChange={handleAddPatientInput}>
                                        <option name="1"> 1</option>
                                        <option name="2">2</option>
                                        <option name="3">3</option>
                                        <option name="4">4</option>
                                        <option name="5">5</option>
                                    </select>
                                    {/* <input type="text" maxLength="1" name="diseaseScore" value={addPatient.diseaseScore} onChange={handleAddPatientInput} placeholder="Enter range between 1-5"></input> */}
                                </div>
                            </div>
                            <div className="table-bordered table-responsive text-center">

                                <table class="table table-bordered mt-5" style={{ border: '1px solid orange' }}>
                                    <tr>
                                        <th style={{ width: '40%' }}>Name</th>
                                        <th style={{ width: '40%' }} >Select</th>
                                    </tr>
                                    {diseaseList && resDisease.map((addPatient => {
                                        return (

                                            <tr>
                                                <td style={{ width: '40%' }} onChange={handleAddPatientInput} name="diseaseName" value={addPatient.diseaseName} className="diseaseNameStyle">
                                                    {/* {disease.diseaseName} */}
                                                    <input onChange={handleAddPatientInput} type='text' required={true} style={{ border: 'none' }} readOnly={true} value={addPatient.diseaseName} />
                                                </td>
                                                <td style={{ width: '40%' }} ><input name="checkboxDisease" value={addPatient.checkboxDisease} onChange={() => handleAddPatientInput(addPatient)} class="form-check-input" type="checkbox" ></input></td>
                                            </tr>
                                        )

                                    }))}
                                </table>
                                <button onClick={submitAddPatient} class="btn btn-danger mt-2">Add Patient</button>
                            </div>
                        </form>
                        <hr></hr>

                    </div>

                </div>

            </div>
        </div>
    )
}