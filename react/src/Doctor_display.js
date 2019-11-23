import React from 'react';
import axios from "axios"
import "./login.css"
import MyNavbar from './myNavbar';

class Doctor_display extends React.Component{
    constructor(props){
        super(props)
        this.state={details:{}}
        // console.log("props inside doctor are",props)
        // console.log("doctor_1_id in ls",localStorage.getItem("doc_1_id"))
        // console.log("doctor_1 in ls",localStorage.getItem("doc_1"))
        // console.log("doctor_1 actually is",props.match.params.id)
        
        if(localStorage.getItem("doc_1_id")===props.match.params.id){
             console.log("fetching predictively from cache")
            }
        else{
            console.log("making request to server")
        }
            var retrievedObject = JSON.parse(localStorage.getItem('doc_1'));
            // console.log("ro",retrievedObject);
            // console.log(this.state);
            this.setState({details:retrievedObject});
            // console.log("see the magic",this.state);
        //     //console.log('retrievedObject: ', JSON.parse(retrievedObject));
        //     var motherfucvkingobject=JSON.parse(retrievedObject)
        //     console.log("aljnhdfaklwhndlawjdl",motherfucvkingobject)
        //     this.setState({details:motherfucvkingobject})
        //     console.log("state is ",this.state)
        
        // else{
            
            axios.get("http://127.0.0.1:8000/api/search/getDoctorByID/"+props.match.params.id)
                .then(
                    res=>{
                        // console.log("res data",res.data)
                        this.setState({details:res.data})
                    }
                )
        // }
        
        // console.log(this.state.details)
    }
    render(){

        var bookurl="/book/"+this.props.match.params.id
        return(
            <div>
                <header class="user__header">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg" alt="" />
                    <h1 class="user__title">DoctorHouse</h1>
                </header>
                <MyNavbar></MyNavbar>
            <img src={this.state.details.image}></img>
            <div><label>Name : </label> {this.state.details.name}</div>
            <div><label>Field : </label> {this.state.details.field}</div>
            <div><label>Expertise : </label> {this.state.details.expertise}</div>
            <div><label>experience : </label> {this.state.details.experience} overall experience</div>
            <div><label>Area : </label> {this.state.details.area}</div>
            <div><label>Address : </label> {this.state.details.address}</div>
            <div> <a href = {this.state.details.maps_link}>Get Directions</a></div>
            <div><label>Email : </label> {this.state.details.email}</div>
            <div><label>Mobile : </label> {this.state.details.mobile}</div>
            <div><label>Other Info : </label> {this.state.details.other_info}</div>
            <div><a href={bookurl}><button>Book apointment</button></a></div>
        </div>
        )
       
           
        
    }
}
export default Doctor_display