import React, { Component } from 'react'
import {connect} from "react-redux"
import {increment,decrement} from "../actions/counter"
import Show from '../components/Show'
import Add from '../components/Add'
import Sub from '../components/Sub'

class Counter extends Component{
    render(){
        return(
            <div>
                <Show counter={this.props.counter}></Show>
                <p>
                    <Add increment={this.props.increment}></Add> &nbsp;
                    <Sub decrement={this.props.decrement} ></Sub> 
                </p>
            </div>
        )
    }
}
export default connect(state=>({counter:state.counter}),{increment,decrement})(Counter)