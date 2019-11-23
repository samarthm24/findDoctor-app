import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from "./App"
import Login from "./Login"
import PrivateRoute from './PrivateRoute'
import Doctor_login from "./Doctor_login"
import Doctor_display from "./Doctor_display"
import Register from "./Register"
import Appointment from "./Appointment"
import booked_app from "./booked_app"
import doc_appointments from './doc_appointments'

class Routes extends React.Component{
  constructor(props){
        super(props)
        this.state={eid:"unset",loggedin:false,email:"",password:""}
    }
seteid=user_eid=>{
  
  this.setState({eid:user_eid})
  console.log('eid in routes is ',this.state.eid);
  localStorage.setItem("eid",this.state.eid)

}
check=()=>{
  console.log(this.state.eid)
}

    
    isAuthenticated = () => {
      console.log("Authenticated func called")
      this.setState({loggedin: true})
    }
    
    render(){
      console.log(this.state.loggedin, this.props)
    return(
        <Router>
          <Switch>
               
              <Route exact path="/"  component={App}  />
              <Route exact path="/l" 
                        render={() => 
                            <Login loggedin={this.state.loggedin}
                                   isAuthenticated={this.isAuthenticated} 
                                   seteid={this.seteid} 
                                   eid={this.state.eid} 
                                   />
                                }
                         />
              <Route exact path= "/book/:doc_id" component={Appointment}></Route>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/appointments" component={booked_app}></Route>
              <Route exact path="/doctor_display/:id"  component={Doctor_display} />
              <Route exact path="/doctor_login"  component={Doctor_login} />
              <Route exact path="/doctor_appointments"  component={doc_appointments} />


          </Switch>
        </Router>
      )  
    }    
}
export default Routes
