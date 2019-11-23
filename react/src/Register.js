import React from "react"
import axios from "axios"
import "./login.css"
class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={email:"",password:"",gender:"",name:"",mobile:""}
        console.log("register page")
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        axios.post("http://127.0.0.1:8000/api/user/signup",this.state)
        .then(res=>{
            if(res.status===200){
                console.log("registered")
                this.props.history.push("/l")
            } 
        }

            )
        .catch(alert("enter valid shit"))
                                  
      } 
    render(){
        return(
            <div class="user">
                <header class="user__header">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg" alt="" />
                    <h1 class="user__title">Doctorhouse</h1>
                </header>
                <form onSubmit={this.handleSubmit}  class="form">
                        <div class="form__group">                        
                            
                            <input  class="form__input" type="text" placeholder="username enter that one" onChange={(e) => this.setState({name: e.target.value})}/>
                        </div>
                        <div class="form__group">                        
                            
                            <input  class="form__input" type="email" placeholder="enter email" onChange={(e) => this.setState({email: e.target.value})}/>
                        </div>
                        <div class="form__group">                        
                            
                            <input  class="form__input" type="text" placeholder="gender" onChange={(e) => this.setState({gender: e.target.value})}/>
                        </div>
                        <div class="form__group">                        
                            
                            <input  class="form__input" type="text" placeholder="enter number" onChange={(e) => this.setState({mobile: e.target.value})}/>
                        </div>
                        <div class="form__group">                        
                            
                            <input  class="form__input" type="password" placeholder="enter password" onChange={(e) => this.setState({password: e.target.value})}/>
                        </div>
                        <input class="btn" type="submit" value="Register" />
                </form>
            </div>

            // <div class="user">
            //     <header class="user__header">
            //         <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg" alt="" />
            //         <h1 class="user__title">A lightweight and simple sign-up form</h1>
            //     </header>
                
            //     <form class="form">
            //         <div class="form__group">
            //             <input type="text" placeholder="Username" class="form__input" />
            //         </div>
                    
            //         <div class="form__group">
            //             <input type="email" placeholder="Email" class="form__input" />
            //         </div>
                    
            //         <div class="form__group">
            //             <input type="password" placeholder="Password" class="form__input" />
            //         </div>
                    
            //         <button class="btn" type="button">Register</button>
            //     </form>
            // </div>
        )
        }
}
export default Register;