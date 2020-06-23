import React,{Component} from 'react';
export default class Sub extends Component{
    render(){
        return(
            <button onClick={()=>this.props.decrement()}>-</button>
        )
    }
}