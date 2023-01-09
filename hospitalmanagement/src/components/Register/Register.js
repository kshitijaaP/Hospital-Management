import axios from "axios"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import "./Register.css"
import HospitalManagementHeader from "../HospitalManagementHeader/HospitalManagementHeader"
export default function Register()
{
  const navigate=useNavigate()
  const [registerUser,setRegisterUser]=useState({fname:'',lname:'',email:'',password:'',confirmpassword:''})

  const handleInput=(e)=>
  {
    const {name,value}=e.target
    setRegisterUser({...registerUser,[name]:value})
    console.log("Register :" +registerUser)
  }   
  const registerFormSubmit=(e)=>
  {
    e.preventDefault();
   const{fname,lname,email,password,confirmpassword}=registerUser
  //  if(fname && lname && email && password &&(password == confirmpassword ) )
   
  //  {
    axios.post("http://localhost:5000/register",registerUser).then((res)=>
    {
      navigate("/login")
    })
   //}

  }
    return(
        <div >
        <div>
        <div class="navBar">
          {/* <Header />
          
          <Logout /> */}
            <HospitalManagementHeader showNavbar={true} >   </HospitalManagementHeader>
        </div>
            <h1 className="registerHeader">Register</h1>
            <div className="registerForm" >
            {/* <h1 className="registerAddHeader"> Add Employee</h1> */}
            <form onSubmit={registerFormSubmit}>
              <h4  className="registerAddFName">First  Name: </h4>
            <input onChange={handleInput} name="fname" value={registerUser.fname} className="registerInputName"  type="text" placeholder="First Name" required></input>
               <br></br>
               <h4  className="registerAddLName">Last  Name: </h4>
            <input onChange={handleInput}  name="lname" value={registerUser.lname} className="registerInputName"  type="text" placeholder="  Last Name" required></input>
               <br></br>
             <h4 className="registerAddEmail"> Email:  </h4>
            <input onChange={handleInput}  name="email" value={registerUser.email} className="registerInputName"   type="text" placeholder="Email Id" required></input>
              <br></br>
              <h4  className="registerAddPassword">  Password: </h4>
            <input onChange={handleInput}  name="password" value={registerUser.password}  className="registerInputName"  type="password" placeholder="Password" required></input>
               <br></br>
               <h4  className="registerAddConfirmPassword">  Confirm Password: </h4>
            <input onChange={handleInput}  name="confirmpassword" value={registerUser.confirmpassword}  className="registerInputName"  type="password" placeholder="Confirm Password" required></input>
               <br></br>
              <button className="registerButton">Add</button>
            </form>
            </div>
        
        </div>
    </div>
    )
}