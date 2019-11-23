import React from "react"
import Axios from "axios"
import "./search.css"
import "./login.css"
import "./App.css"
import Appo from "./Appo"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class doc_appointments extends React.Component{
    constructor(props){
        //console.log("samartsh penis is small")
        super(props)
        this.state={r:[],appoints:[],date:new Date()}
        console.log(this.state.date)
        //const doctors=this.state.doctor_rec.map(doctor=><Doctor key={doctor.id} details={doctor}/
    }
    submitHandler=(e)=>{
        
        // var slot_value=document.getElementById('slot').value.toString();
        // this.setState({slot:slot_value})
        e.preventDefault()
        console.log("ls doc_log_id",localStorage.getItem("doc_login_id"))
        console.log("state date is ",this.state.date)
        Axios.post("http://localhost:8000/api/book/getBookingsByDocID",{doc_id:localStorage.getItem("doc_login_id"),date:this.state.date})
        .then(res=>{console.log("res from doc_appointments is",res.data)
                    const res_b=res.data
                    //console.log(res_b)
                    this.setState({r:res_b})
                    console.log("state r is ",this.state.r)
                    const appoint=this.state.r.map(appo=><Appo  details={appo}   />)
                    this.setState({appoints:appoint})
        
                    })
    }
    render(){
        console.log(this.state.r)
        return(
            <div>
                <header class="user__header">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg" alt="" />
                    <h1 class="user__title">DoctorHouse</h1>
                </header>

                <DatePicker
                    selected={this.state.date}
                    onChange={(e) => { this.setState({ date:e });
                    console.log("date",this.state.date)}}
                    
                />
                <button  onClick={this.submitHandler}>click</button>
               

                {this.state.appoints}

            </div>
        )
    }
    
}
export default doc_appointments