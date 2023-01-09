import React from "react"
import './HomePage.css'
import BackGroundImage from '../images/backgroundImage.webp'
import HospitalManagementHeader from "../HospitalManagementHeader/HospitalManagementHeader"

export default function HomePage(){
    return(
        <>
        <HospitalManagementHeader showNavbar={true} > </HospitalManagementHeader>
        <img src={BackGroundImage} style={{width:'100%',height:'80%'}}></img>
        <h1 className="HospitalHeader">Cosmos Hospital</h1>
      

        </>
      
    )
}