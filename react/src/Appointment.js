import React from 'react';
import axios from "axios"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./login.css"
import MyNavbar from './myNavbar';
import "./search.css"
import "./login.css"
import "./App.css"
class Appointment extends React.Component {
    constructor(props){
        super(props)
        //console.log(props)
        this.state={doc_id:this.props.match.params.doc_id,user_id:localStorage.getItem("eid"),date_r:new Date(),slot:"1",name:"",avail_slots:[]}
        var eid=localStorage.getItem("eid")
        console.log("from storage",eid)
    }
    submitHandler=(e)=>{
        e.preventDefault()
        // var slot_value=document.getElementById('slot').value.toString();
        // this.setState({slot:slot_value})
        axios.post("http://localhost:8000/api/book/getSlotsByDocID",this.state)
        .then(res=>{console.log(res.data)
                    this.setState({avail_slots:res.data})
                })
        
        if(true){
            console.log("state is ",this.state)
        axios.post("http://localhost:8000/api/book/makeAppointment",this.state)
        .then(res=>console.log(res))
        alert("booked succesfully")
        }
        else{
            alert("slot taken by samarth")
        }
        
        
    }
    onChangeDate=()=>{
        axios.post("http://localhost:8000/api/book/getSlotsByDocID",this.state)
        .then(res=>{console.log(res.data)
                    this.setState({avail_slots:res.data})
                })
    }
    render(){
        return(
            <div>
                <header class="user__header">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg" alt="" />
                    <h1 class="user__title">DoctorHouse</h1>
                </header>
                <br></br>
                <MyNavbar></MyNavbar>
                <br></br>
                <div style={{marginLeft: "600px"}}>
                <label>Pick The date</label>
                <DatePicker
                    selected={this.state.date_r}
                    onChange={(e) => { this.setState({ date_r:e })
                                        this.onChangeDate() }}
                    
                />
                <br></br>
                <label>Enter Patient Name</label>
                <input class="form__group" type="text" placeholder="Enter Patient Name" onChange={(e)=>this.setState({patient_name:e.target.value})} ></input>
                <br></br>
                <label>Select Slot</label>
                <select class="form__group" id = 'slot' onChange={(e) => { this.setState({ slot:e.target.value });this.onChangeDate() }}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
                </div>
                <br></br>
                <button class="button" type="submit" onClick={this.submitHandler}>Book</button>
                
                
            </div>
        )
    }
}
export default Appointment