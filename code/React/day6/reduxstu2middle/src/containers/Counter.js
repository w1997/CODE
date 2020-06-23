import React,{Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import * as actions from "../actions/counter"

import Show from "../components/Show"
import Add from "../components/Add"
import OddAdd from "../components/OddAdd"
import Sub from "../components/Sub"
import AsyncAdd from "../components/AsyncAdd"

class Counter extends Component{
    render(){
        return(
            <div>
                <Show counter={this.props.counter}></Show>
                <p>
                    <Add increment={this.props.increment}></Add> &nbsp;
                    <Sub decrement={this.props.decrement}></Sub> &nbsp;
                    <AsyncAdd incrementAsync={this.props.incrementAsync}></AsyncAdd> &nbsp;
                    <OddAdd incrementIfOdd={this.props.incrementIfOdd}></OddAdd>
                </p>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        counter:state.counter
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(actions,dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Counter)