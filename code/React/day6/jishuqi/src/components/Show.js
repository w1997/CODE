import React, { Component } from 'react'

export default class Show extends Component{
    render(){
        return(
        <h3>counter:{this.props.counter}</h3>
        )
    }
}