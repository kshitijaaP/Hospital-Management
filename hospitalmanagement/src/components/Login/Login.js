import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import App from "../../App"
import HospitalManagementHeader from "../HospitalManagementHeader/HospitalManagementHeader"
import "./Login.css"
export default function Login() {
  // 
  const [loginUser, setLoginUser] = useState({ password: '', email: '' })
  const [IncorrectPasswordMsg, setIncorrectPasswordMsg] = useState('')
  const [IncorrectPassword, setIncorrectPassword] = useState(false)
  const [authenticateUser, setAuthenticateUser] = useState(false)
  let authenticateKar = false;
  const win=window.sessionStorage
 
  const navigate = useNavigate()

  const handleLoginInput = (e) => {
    const { name, value } = e.target
    setLoginUser({ ...loginUser, [name]: value })

  }
  const loginSubmit = (e) => {
    e.preventDefault();
    const { password, email } = loginUser
    axios.post("http://localhost:5000/login", loginUser).then((res) => {
      if (res.data.message == "Success") {
        authenticateKar = true;
        win.setItem('Useremail',loginUser.email)
         win.setItem('Userpassword',loginUser.password)
         console.log(win)
        // setAuthenticateUser(true)
        navigate("/dashboard",  {state:{authenticateUser:true}})
      
        
      }
      if (res.data.message == "Password Incorrect") {

        setIncorrectPasswordMsg("Password Incorrect .Please Enter the Correct Password")
        setIncorrectPassword(true)

        navigate("/login")
      }
      if (res.data.message == "Please register first") {
        navigate("/register", alert("res.data.message"))
      }

    })
  }
  return (
    <div >
      <div>
        <div class="navBar">
 
          {/* <Header />
          <Logout /> */}
          <HospitalManagementHeader showNavbar={true} >   </HospitalManagementHeader>
        </div>
        <h1 className="loginHeader">Login</h1>
        {IncorrectPassword && <h2>{IncorrectPasswordMsg}</h2>}
        <div className="loginForm" >
          {/* <h1 className="loginAddHeader"> Add Contact</h1> */}
          <form onSubmit={loginSubmit}>

            <h4 className="loginAddEmail"> Email:  </h4>
            <input onChange={handleLoginInput} name="email" id="email" className="loginInputEmail" type="text" placeholder="Enter your Email Id" required></input>
            <br></br>
            <h4 className="loginAddName">  Password: </h4>
            <input onChange={handleLoginInput} name="password" id='name' className="loginInputName" type="password" placeholder="Enter your name" required></input>
            <br></br>
            <button className="loginButton">Add</button>
          </form>
        </div>

      </div>

    </div>

  )

}