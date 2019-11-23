import React from "react"
import Axios from "axios"
import "./search.css"
import "./login.css"
import "./App.css"
import Appo from "./Appo"
import MyNavbar from "./myNavbar"
class booked_app extends React.Component{
    constructor(props){
        //console.log("samartsh penis is small")
        super(props)
        this.state={r:[],appoints:[]}
        Axios.post("http://localhost:8000/api/book/getBookingsByUserID",{user_id:localStorage.getItem("eid")})
        .then(res=>{console.log("res from booked_app is",res.data)
                    const res_b=res.data
                    //console.log(res_b)
                    this.setState({r:res_b})
                    console.log("state r is ",this.state.r)
                    const appoint=this.state.r.map(appo=><Appo  details={appo}   />)
                    this.setState({appoints:appoint})
        
                    })
        //const doctors=this.state.doctor_rec.map(doctor=><Doctor key={doctor.id} details={doctor}/
        
        
    }
    render(){
        console.log(this.state.r)
        return(
            
            <div>
                <MyNavbar></MyNavbar>
                <header class="user__header">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg" alt="" />
                    <h1 class="user__title">DoctorHouse</h1>
                </header>

                {this.state.appoints}

            </div>
        )
    }
    
}
export default booked_app