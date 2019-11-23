import React from 'react';
import axios from "axios"
import "./doctor.css"


class Doctor extends React.Component{
    constructor(props){
        super(props)
        console.log("props inside doctor are",props)
    }
    render(){
        var namelink="/doctor_display/"+ this.props.details.id
        return(
        <div class = 'mini_doctor'>
            <img class = "doc_img" src={this.props.details.image}></img>
            <a href={namelink}>{ this.props.details.name}</a>
            <br/>
            <div class = "doc_mini">Field : {this.props.details.field}</div>
            <div><br/>Experience : {this.props.details.experience}</div>
            <div><br/>Area : {this.props.details.area}</div>

        
        </div>
           
        )
    }
}
export default Doctor