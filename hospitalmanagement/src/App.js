
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SystemSettingHomePage from './components/SystemSettingHomePage/SystemSettingHomePage';
import Navbar from './components/Navbar/Navbar';
import AddPatient from './components/AddPatient/AddPatient';
import Dashboard from './components/Dashboard/Dashboard';
import HospitalManagementHeader from './components/HospitalManagementHeader/HospitalManagementHeader';
import Login from './components/Login/Login'
import Logout from './components/Logout/Logout';
// import Logout from './components/'
import Register from './components/Register/Register'
import HomePage from './components/HomePage/HomePage';
function App() {

  const win = window.sessionStorage
  console.log(win.getItem('Useremail'))
  const LoggedInUser = win.getItem('Useremail')
  return (
    <>
      {/* <HospitalManagementHeader/> */}

      <Router>

        <Routes>

          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/systemsetting" element={<SystemSettingHomePage />}></Route>
          <Route path="/addpatient" element={<AddPatient />}></Route>

        </Routes>
      </Router>

    </>





  );
}

export default App;
