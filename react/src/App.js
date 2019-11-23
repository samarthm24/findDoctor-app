import React from 'react';
import axios from "axios"
import Doctor from "./doctor"
import MyNavbar from "./myNavbar"
import "./search.css"
import "./login.css"
import "./App.css"
class App extends React.Component {

  constructor() {
    super()
    this.state = { search: "", age: 0 ,clicked:false,doctor_rec:[],doctors:[]}
  }

  handleSubmit = (e) => {
    //console.log(this.state)
    e.preventDefault()
    axios.post("http://127.0.0.1:8000/api/search/smartSearch",{query:this.state.search,patient_age:this.state.age,doc_1:{}})
    .then(
      res=>{
        console.log(res)
        const values=res.data
        //console.log("values are",values)
        this.setState({doctor_rec:values})
        const doctors=this.state.doctor_rec.map(doctor=><Doctor key={doctor.id} details={doctor}/>)
        const doctor_1_id=this.state.doctor_rec[0].id
        console.log("prefectch",doctor_1_id)
        axios.get("http://127.0.0.1:8000/api/search/getDoctorByID/"+doctor_1_id)
        .then(res=>{
            
              const val=res.data
              console.log("res.data",val)
              this.setState({doc_1:val})
              console.log("state res",this.state.doc_1)
              
              localStorage.setItem("doc_1",JSON.stringify(val))
              localStorage.setItem("doc_1_id",doctor_1_id)
              console.log("doc_1_id",localStorage.getItem("doc_1_id"))
              console.log("doc_1",localStorage.getItem("doc_1"))
            })
        
        this.setState({doctors:doctors})
      }

      //const doctors_rec=this.state.doctor_rec.map(doctor=><Doctor key=doctor.id doctor={doctor})/>
    )
    
   this.setState({clicked:true})
    console.log(this.state.doctor_rec)

  }

  render() {
    return (
      
      <div >
        <header class="user__header">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg" alt="" />
                    <h1 class="user__title">DoctorHouse</h1>
                </header>
                <br></br>
                <MyNavbar></MyNavbar>
                <br></br>
                <div class="samarthsclass">
                
        <form  class="form" onSubmit={this.handleSubmit}>
        <div >
              <input type="text" class = "search_bar" placeholder="Search..." onChange={(e) => this.setState({ search: e.target.value })}/>
          <div class="search"></div>
        </div>
        <br></br>
          <input type="number" class = "search_bar" placeholder="enter age" onChange={(e) => this.setState({ age: e.target.value })}></input>
          <br></br>
          <button type="submit" class="button">search</button>
          {
            this.state.clicked?
                <div> <br></br> {this.state.doctors} </div>
                :<div></div>
              
          }
        </form>
        </div>

      </div>
    )
  }
}

export default App;
