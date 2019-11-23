import React from "react"
import "./search.css"
import "./login.css"
import "./App.css"
import "./doctor.css"
import 'bootstrap/dist/css/bootstrap.min.css';



class Appo extends React.Component{
    constructor(props){
        super(props)
        //console.log(props.details)
    }
    render(){
        return(
            
            <div class = "mini_doctor" >
                
                <div class="w3-container">Patient name:  {this.props.details.patient_name}</div>
                <div class="w3-container">Doctor name:   {this.props.details.doctor_name}</div>
                <div class="w3-container">Slot no:   {this.props.details.slot}</div>
                <div class="w3-container">Date:  {this.props.details.date}</div>
                <br></br>
            </div>
        )
    }
}
export default Appo