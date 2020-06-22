import React,{Component} from "react"
import PropTypes from "prop-types"
export default class Todo extends Component{
     //验证规则
     static propTypes={
        todos:PropTypes.array.isRequired,
    }
    render(){
        return(
            <li className="todo">
                <div className="view">
                    <input type="checkbox"className="toggle" checked={this.props.todo.complete} />
                    <label > {this.props.todo.content}</label>
                    <button className="destroy"></button>
                </div>
                <input type="text" className="edit" style={{display:"none"}} />
            </li>
        )
    }
}