import { useState } from "react"
export default function AddDoctor() {
    const [addDoctorInput, setAddDoctorInpu] = useState({ doctorName: '', doctorDegree: '' })
    const [resDoctor, setResDoctor] = useState([])
    const [doctorList, setDoctorList] = useState(false)
    const handleSystemSettingInput = () => {

    }
    const onSubmitDoctor = (e) => {
        e.preventDefault()
    }
    return (
        <div>

            <div className="addDoctorContainer">

                <p className='paraDoctorAdd'>Add new doctor in the system</p>
                <form>
                    <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-3 col-label mt-1" style={{ fontWeight: 'bold', fontSize: '15px' }}>Doctor Name</label>
                        <div class="col-sm-9" style={{ border: 'none' }}>
                            {/* <input type="email" id="inputEmail3" placeholder="Email"></input> */}
                            <input onChange={handleSystemSettingInput} class="form-control" name='doctorName' type="text" placeholder='Enter new doctor name' value={addDoctorInput.doctorName}></input>

                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-3 col-form-label mt-3" style={{ fontWeight: 'bold', fontSize: '15px' }}>Doctor Degree</label>
                        <div class="col-sm-9 mt-3" style={{ border: 'none' }}>
                            <input pattern="[0-5]" maxLength="1" onChange={handleSystemSettingInput} class="form-control" name='doctorScore' type="text" placeholder='Enter new doctor score' value={addDoctorInput.doctorDegree}></input>
                        </div>
                    </div>


                    <div class="form-group row">
                        <div class="col-sm-10" style={{ border: 'none' }}>
                            <button type="submit" onClick={onSubmitDoctor} class="btn btn-primary mt-2">Add Doctor</button>
                        </div>
                    </div>
                </form>
            </div>
            <hr></hr>
            <div className="table-bordered table-responsive text-center" >
                <p className='paraDoctorDelete'>Delete doctors from system</p>
                <table class="table table-bordered" style={{ border: '1px solid orange' }}>
                    <tr>
                        <th style={{ width: '40%' }}>Name</th>
                        {/* <th style={{ width: '40%' }} >Score</th> */}
                        <th style={{ width: '40%' }} >Select</th>
                    </tr>
                    {doctorList && resDoctor.map((doctor => {
                        return (

                            <tr>
                                <td style={{ width: '40%' }} className="doctorNameStyle">{doctor.doctorName}</td>
                                {/* <td style={{ width: '40%' }} className="doctorScoreStyle" >{doctor.doctorScore}</td> */}
                                <td style={{ width: '40%' }} ><input class="form-check-input" type="checkbox" id="check1" name="option1" value="something"></input></td>
                            </tr>
                        )

                    }))}
                </table>
                <button class="btn btn-danger mt-2">Delete doctors</button>
            </div>

        </div>
    )
}