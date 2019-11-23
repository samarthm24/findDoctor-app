import React from "react"

import axios from "axios"
import { Redirect } from 'react-router-dom'
import "./login.css"


class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={email:"",password:""}
        localStorage.setItem("type","p")
        console.log("ls type",localStorage.getItem("type"))
    }

    handleSubmit = (e) => {
      e.preventDefault()
      console.log("props are",this.props)
        axios.post('http://127.0.0.1:8000/api/user/login',this.state)
        //axios.post('http://127.0.0.1:8000/api/user/login',{email:"samarthm241020@gmail.com",password:"password"})
      .then(res=>{if(res.status===200){
                                    this.props.isAuthenticated()
                                    console.log("res is ",res.data.e_id)
                                    this.props.seteid(res.data.e_id)
                                    console.log("eid in parent is ",this.props.eid)
                                } 
                    else{console.log("enter valid credentials")
                        alert("enter valid credentials")}
                    
                })
        .catch(
            res=>{
                if(res.status!==200){
                    alert("try again noob")
                }

            })
            
        
    } 

    render(){
        if(this.props.loggedin)
            return <Redirect to="/" />
        return(
            // <div>
            //     <form class="form" onSubmit={this.handleSubmit}>
            //         <div class="form__group">                        
            //             <label htmlFor="Username">Username</label>
            //             <input type="text" placeholder="username enter that one" onChange={(e) => this.setState({email: e.target.value})}/>
            //         </div>
            //         <div>                        
            //             <label htmlFor="password">Password</label>
            //             <input type="password" onChange={(e) => this.setState({password: e.target.value})}/>
            //         </div>
            //         <input type="submit" value="Login" />
            //     </form>
            //     <a href="/Register"> Click here to register </a>
            // </div>
            <div>
                <img src={ require('./OQ6UTW0.jpg') } class = "image"/>
                <div class="user">
                    <header class="user__header">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg" alt="" />
                        <h1 class="user__title">DoctorHouse</h1>
                    </header>
                    
                    <form class="form" onSubmit={this.handleSubmit} >
                        <div class="form__group">
                            <input type="email" placeholder="Email" class="form__input" onChange={(e) => this.setState({email: e.target.value})} />
                        </div>
                        
                        <div class="form__group">
                            <input type="password" placeholder="Password" class="form__input" onChange={(e) => this.setState({password: e.target.value})}/>
                        </div>
                        
                        <button class="btn" type="submit">Login</button>
                        <a href="/Register" class="btn" > Click here to register </a>
                    </form>
                    
                </div>
            </div>
        
        )
    }

}

export default Login