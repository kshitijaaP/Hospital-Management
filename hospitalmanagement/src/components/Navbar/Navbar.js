
import { NavLink } from "react-router-dom"
// import DashboardIcon from './public/images/dashboardLogo.png'
import DashboardIcon from '../images/dashboardLogo.png'
import AmbulanceIcon from '../images/addPatientLogo.png'
import SettingIcon from '../images/systemSettingLogo.png'
import './Navbar.css'
export default function Navbar() {

    const win=window.sessionStorage
    console.log(win.getItem('Useremail'))
    const LoggedInUser=win.getItem('Useremail')
    return (
        <div class="container">
            <div className="sideNavbars">
               <ul>
                <br></br>
                 <li  >
                    <img style={{width:'17%'}} src={DashboardIcon}></img>
                        <NavLink style={{width:'17%',marginTop:'20px'}} className="styleNavLink" to={"/dashboard"}>Dashboard</NavLink>
                    </li>
                 
                    <li>
                    <img style={{width:'16%'}} src={AmbulanceIcon}></img>
                        <NavLink className="styleNavLink" to={"/addpatient"}>Add patient</NavLink>
                    </li>
                  
                    <li>
                    <img style={{width:'17%'}} src={SettingIcon}></img>
                        <NavLink  className="styleNavLink" to={"/systemsetting"}>System Setting</NavLink>
                    </li>
                   
                </ul>
            </div>
        </div>
    )
}