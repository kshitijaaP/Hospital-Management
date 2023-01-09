import './SystemSettingHomePage.css'
import react from "react"
import AddDisease from '../AddDisease/AddDisease';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddRoom from '../AddRoom/AddRoom';
import Navbar from '../Navbar/Navbar';
import HospitalManagementHeader from '../HospitalManagementHeader/HospitalManagementHeader';
import AddDoctor from '../AddDoctor/AddDoctor';
export default function SystemSettingHomePage() {
  return (
    <div className="Navbar">
      {/* <HospitalManagementHeader/> */}
      <HospitalManagementHeader showNavbar={false} >   </HospitalManagementHeader>
      {/* <h2 className='headerManagement'>Hospital Management</h2> */}
      
   
      <div >
        <div className="row">
          <div className="col col-lg-2">
            <Navbar/>
            
          </div>
          <div className="col col-lg-4 mt-5">
          <h5 className='SystemSettingName'>System setting</h5>
        
            <AddDisease />
          </div>
          <div className="col col-lg-4">
           <AddRoom/>
          </div>
          <div className="col col-lg-2">
            {/* <AddDoctor/> */}
          </div>
        </div>
      </div>
    </div>
  )
}