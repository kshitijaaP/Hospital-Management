import './HospitalManagementHeader.css'
import { NavLink } from "react-router-dom"
export default function HospitalManagementHeader(showNavbar) {

    sessionStorage.clear();
    return (
        <div>
            <h2 className="HeaderHospMgmt">Cosmos Hospital</h2>
            <nav class="navbar navbar-expand-sm fixed-top navbar-light ">
                <div >

                     
                        {
                            showNavbar.showNavbar == true ?
                              ((  
                              <ul>
                              <li style={{border:'none',display:'inline '}}>
                                    <NavLink className="styleNavLinkHeaderRegister" to={"/register"}>Register</NavLink>

                                </li> 
                                <li style={{border:'none',display:'inline '}}>
                                    <NavLink className="styleNavLinkHeaderLogin" to={"/login"}>Login</NavLink>

                                </li>
                                </ul>)) :
                                <ul class="nav navbar-nav navbar-right">
                                <li style={{border:'none',display:'inline '}}>
                                    <NavLink className="styleNavLinkHeaderLogout" to={"/"}>Logout</NavLink>
                                </li>
                                </ul>
                        }
                
                   
                </div>
            </nav>


        </div>
    )
}