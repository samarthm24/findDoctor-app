import React from "react"
import { Link } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

const MyNavbar = () => {
    
    if(localStorage.getItem("type")==="p"){
      return(
        
        <Navbar bg="dark" variant="dark">
        
        <Nav className="mr-auto">
          <Nav.Link><Link to="/" style={{color:'black'}}>Home</Link></Nav.Link>
          <Nav.Link><Link to="/appointments" style={{color:'black'}}>Appointments</Link></Nav.Link>
          <Nav.Link><Link to="/doctor_login" style={{color:'black'}}>DOcLog</Link></Nav.Link>
          
        </Nav>
      </Navbar>
    );
    }
    return null

    
}


export default MyNavbar