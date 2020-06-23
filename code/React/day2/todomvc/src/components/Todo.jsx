import React,{Component} from "react"
import PropTypes from "prop-types"
export default class Todo extends Component{
     //验证规则
     static propTypes={
        todos:PropTypes.array.isRequired,
        deleteTodo:PropTypes.func.isRequired,
        toggleTodo:PropTypes.func.isRequired,
    }
    render(){
        return(
            <li className={this.props.todo.complete ? "todo completed" : "todo"}>
                <div className="view">
                    <input type="checkbox"className="toggle" 
                        checked={this.props.todo.complete} 
                        onClick={()=>this.props.toggleTodo(this.props.todo)}
                    />
                    <label > {this.props.todo.content}</label>
                    <button className="destroy"
                        onClick={()=>this.props.deleteTodo(this.props.todo)}
                    ></button>
                </div>
                <input type="text" className="edit" style={{display:"none"}} />
            </li>
        )
    }
}