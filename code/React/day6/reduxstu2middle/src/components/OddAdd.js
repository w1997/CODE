import React,{Component} from 'react';
export default class OddAdd extends Component{
    render(){
        return(
            <button onClick={()=>this.props.incrementIfOdd()}>IfOdd</button>
        )
    }
}